async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  
  
  export async function signup(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(context)
      }
      const body = await basicFetch("http://localhost:8000/accounts/signup",payload)
      console.log(body, "API CALL")
      return body
    }
    
  export async function login(context) {
   
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch("http://localhost:8000/accounts/get-token", payload)
    localStorage.setItem("token", body.token)
    return body.token
  }
  

  export async function addCar(context) {

    const userToken = localStorage.getItem("token")
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userToken}`
      },
      body: JSON.stringify(context)
      
    }
    const body = await basicFetch("http://localhost:8000/mygarage/", payload)
    console.log(body)
    return {"congrats": "on your new car"}
  }


  export async function getCar(context) {

    const userToken = localStorage.getItem("token")
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userToken}`
      },
    }
    const body = await basicFetch("http://localhost:8000/mygarage/", payload)
    // const results = await body.json()

    return body
  }
  