import error from './errors';
import validate from './validates';
import menu from './menu';

export default {
  error,
  validate,
  menu,
  app: {
    title: 'App',
    account: `Atamiri sart'awixa`,
    settings: 'Wakichawinaka',
    logOut: `Sart'awi tukuyaña`
  },
  login: {
    title: `Sart'awima qalltama`,
    user: 'Atamiri jaqi suti',
    password: `Aru imt'ata`,
    rememberMe: 'Amtasita',
    forgotPass: `¿Armastati aru imt'añama?`,
    login: 'Mantaña',
    noAccount: '¿Janit atamirina qillqataqta?',
    signUp: 'Akxaru qillqantasima'
  },
  loginAdmin: {
    title: 'Inicia tu sesión',
    user: 'Nombre de usuario',
    password: 'Contraseña',
    rememberMe: 'Recuerdame',
    forgotPass: '¿Se te olvidó tu contraseña?',
    login: 'Ingresar',
    noAccount: '¿No tienes una cuenta?',
    signUp: 'Registrate aquí'
  },
  usuarios: {
    newUser: 'Nuevo Usuario',
    usersPerPage: 'Usuarios por página',
    adding: 'Agregando usuario',
    personalData: 'Datos Personales.',
    enterPersonalData: 'Ingrese los datos personales para agregarlo al sistema.',
    firstLastName: 'Primer apellido',
    secondLastName: 'Segundo apellido',
    names: 'Nombres',
    id: 'Cédula de identidad',
    place: 'Lugar',
    gender: 'Género',
    male: 'Masculino',
    female: 'Femenino',
    bornDate: 'Fecha de nacimiento',
    userData: 'Datos de la cuenta de usuario.',
    enterUserData: 'Asigne un correo electrónico y un rol a la persona.',
    email: 'Correo Electrónico',
    rol: 'Rol de usuario',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    headAccions: 'Acciones',
    headEstate: 'Estado'
  },
  common: {
    add: `Yapt'aña`,
    required: `Qillqañatakipuni`,
    cancel: 'Chhaqtayaña',
    save: 'Imaña',
    rowsPage: 'siqinaka, laphi layku',
    updateList: `Wasitata waruchaña `,
    filters: `Ch'umaña/Thaqhaña`,
    of: 'de',
    active: `Q'apha`,
    edit: 'Qillqsuña',
    status: 'Estado',
    actions: `Lurañanaka`
  },
  entity: {
    title: `Jach'a utanaka`,
    add: `Machaqa jach'a uta yapt'aña`,
    crud: {
      edit: 'Qillqsuyaña',
      code: 'Código',
      acronym: `Jisk'a suti`,
      description: 'Amuykipawinaka',
      status: 'Estado',
      addEnt: `jach'a uta yapt'aña`,
      editEnt: `jach'a uta qillqsuña`
    }
  },
  account: {
    title: `Atamiri sart'awinaka`,
    add: `Machaqa atamiri sart'awi`,
    select: `Jach'a uta ajllima, atamiri sart'awinaka uñjañataki`,
    crud: {
      edit: 'Qillqsuña',
      accountNumber: `Atamiri sart'awi jakhupa`,
      status: 'Estado',
      entity: `Jach'a uta`,
      addAc: `Atamiri sart'awi yapt'aña`,
      editAc: `Atamiri sart'awi qillqsuña`
    }
  },
  user: {
    title: 'Usuarios',
    add: 'Agregar nuevo usuario',
    crud: {
      edit: 'Editar',
      user: 'Usuario',
      userData: 'Datos del usuario',
      entity: 'Entidad',
      role: 'Rol',
      status: 'Estado',
      addUser: 'Agregar usuario',
      editUser: 'Editar usuario'
    }
  }
};
