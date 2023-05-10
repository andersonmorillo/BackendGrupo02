const getMenuFront = (role = "USER_ROLE") => {
  const menu = [
    {
      title: "Menú principal",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Ver citas", url: "/dashboard/citas" },
        { title: "Tomar una cita", url: "/dashboard/new-cita" },
        { title: "Cancelar una cita", url: "/dashboard/citas" },
        { title: "Ver listado de hospitales", url: "/dashboard/hospitales" },
        { title: "Ver listado de médicos", url: "/dashboard/medicos" },
      ],
    },
    {
      title: "",
      icon: "",
      submenu:[]
    }
  ];

  if (role === "ADMIN_ROLE") {
    menu[1].title = "Mantenimiento"
    menu[1].icon = "mdi mdi-folder-lock-open"
    menu[1].submenu = [{ title: "Usuarios", url: "usuarios" },{ title: "Hospitales", url: "hospitales" },{ title: "Medicos", url: "medicos" }]
  }
  return menu;
};

module.exports = getMenuFront;
