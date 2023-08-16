const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: '',
			loggedIn: false,
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
			loginStatus: () => {
				const store = getStore()
				const setLogin = !store.loggedIn
				setStore({loggedIn: setLogin})
			},
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
					return true
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
				.then(data => {setStore({userFavorites: data})})
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
			addUserFavorite: (name, type, id) => {
				fetch(`${process.env.BACKEND_URL}api/favorites`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${getStore().token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						name: name,
						type: type,
						og_id: id
					})
				})
				.then(resp => {
					if (resp.ok) getActions().getUserFavorites()
				})
			},
			removeFavorite: (obj) => {
				const store = getStore();
				const newArr = store.favorites.filter((item) => item.name != obj.name)
				setStore({favorites: newArr})
			},
			deleteUserFavorite: (fav_id) => {
				fetch(`${process.env.BACKEND_URL}api/favorites/${fav_id}`, {
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${getStore().token}`
					}
				})
				.then(resp => {
					if (resp.ok) getActions().getUserFavorites()
				})
			},
			logout: () => {
				setStore({loggedIn: false})
				setStore({token: ''})
				setStore({userFavorites: []})
			}
		}
	};
};

export default getState;
