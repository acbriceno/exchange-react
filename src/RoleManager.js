class RoleManager {
  constructor(){
    this.routes = {
      ADMIN: "/admin",
      CUSER: "/"
    }
  }

  getStartingRoute(role){
    return this.routes[role]
  }
}

export default new RoleManager()
