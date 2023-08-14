const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: '',
			favorites: [
				{
					name: "R5-D4",
					type: "character",
					id: "8"
				},
				{
					name: "Bespin",
					type: "planet",
					id: "6"
				}
			],
			userFavorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (email, password) => {
				const resp = await fetch(`${process.env.BACKEND_URL}api/login`, {
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					}),
					method: 'POST'
				})
				try {
					if (!resp.ok) {
						console.error(await resp.json())
						return false
					}
					const data = await resp.json()
					setStore(data)
					return true
				} catch (error) {
					console.error("Error: ", error)
					return false
				}
			},
			signup: async (email, username, password) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/signup`, {
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							username: username,
							password: password
						}),
						method: 'POST'
					})
					if (!resp.ok) {
						console.error(await resp.json())
						return false
					}
					console.log("User successfully created! Logging you in now!")
					return await getActions().login(email, password)
				} catch (error) {
					console.error("Error: ", error)
					return false
				}
			},
			getUserFavorites: () => {
				fetch(`${process.env.BACKEND_URL}api/favorites`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${getStore().token}`
					}
				})
				.then(resp => resp.json())
				.then(data => setStore({userFavorites: data.Favorites}))
			},
			addFavorite: (name, type, id) => {
				const store = getStore();
				if (store.favorites.filter((item) => item.name === name).length === 0) {
					const newObj = {
						name: name,
						type: type,
						id: id
					}
					const newArr = [...store.favorites, newObj]
					setStore({favorites: newArr})
				} else console.log("That's already in here");
			},
			removeFavorite: (obj) => {
				const store = getStore();
				const newArr = store.favorites.filter((item) => item.name != obj.name)
				setStore({favorites: newArr})
			}
		}
	};
};

export default getState;
