import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Ahora nuestro hook acepta un parámetro adicional: el método
export const useFetch = (url, method = 'GET') => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	// Creamos una nueva pieza de estado para manejar las opciones de fetch.
	const [options, setOptions] = useState(null);

	// Definimos una función para actualizar las opciones de fetch y postear data a db.json
	const postData = postData => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(postData)
    })
  }
  // Si queremos hacer un request POST esto debe ourrir luego de que se haya llamado la función postData, y no antes, 
	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async (fetchOptions) => {
			setIsPending(true);

			try {
        // Usamos el spread operator para añadir las opciones pasadas por parámetros al método get
				const res = await fetch(url, { ...fetchOptions, signal: controller.signal });
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				const data = await res.json();

				setIsPending(false);
				setData(data);
				setError(null);
			} catch (err) {
				if (err.name === 'AbortError') {
					console.log('the fetch was aborted');
				} else {
					setIsPending(false);
					setError('Could not fetch the data');
				}
			}
		};
    // Revisamos si el método es get o post:
    if (method === 'GET') {
      fetchData();
    }
    if (method === 'POST' && options) {
      fetchData(options)
    }

		return () => {
			controller.abort();
		};
	}, [url, options, method]);
  // Retornamos la nueva función
	return { data, isPending, error, postData };
};
