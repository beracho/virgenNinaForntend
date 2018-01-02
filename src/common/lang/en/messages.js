import error from './errors';
import validate from './validates';
import menu from './menu';

export default {
  error,
  validate,
  menu,
  app: {
    title: 'App',
    account: 'My account',
    settings: 'Settings',
    logOut: 'Logout'
  },
  login: {
    title: 'Login',
    user: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPass: 'Forgot password?',
    login: 'Login',
    noAccount: 'Dont have an account?',
    signUp: 'Signup here'
  },
  loginAdmin: {
    title: 'Start session',
    user: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPass: 'Forgot your password?',
    login: 'Login',
    noAccount: 'No account?',
    signUp: 'Sign up'
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
    headEstate: 'Estado',
    emailRequired: 'El correo electrónico es requerido',
    emailValid: 'No es un correo electrónico válido',
    errorFillForm: 'Debe llenar el formulario para guardar.',
    successSendEmail: 'Hemos enviado un correo de activación de cuenta a ',
    errorSendEmail: 'Fallo al enviar correo.'
  },
  confirm: {
    title: 'Por favor, ingrese su contraseña',
    password: 'Contraseña',
    confirmPassword: 'Repita contraseña',
    home: 'Volver',
    accept: 'Actualizar contraseña',
    errorFieldsNotEqual: 'Los campos de contraseña no son iguales.',
    errorFieldRequired: 'El campo de contraseña es requerido.',
    errorFieldMinLength: 'La contraseña debe tener como mínimo 8 caracteres.',
    errorFieldMaxLength: 'La contraseña debe tener como máximo 20 caracteres.'
  },
  common: {
    add: 'Add',
    required: 'Required',
    cancel: 'Cancel',
    save: 'Save',
    rowsPage: 'Rows per page',
    updateList: 'Update list',
    filters: 'Filters/Search',
    of: 'of',
    active: 'Active',
    edit: 'Edit',
    status: 'State',
    actions: 'Actions'
  },
  entity: {
    title: 'Entities',
    add: 'Add new entity',
    crud: {
      edit: 'Edit',
      code: 'Code',
      acronym: 'Acronym',
      description: 'Description',
      status: 'Status',
      addEnt: 'Add entity',
      editEnt: 'Edit entity'
    }
  },
  account: {
    title: 'Accounts',
    add: 'Add new account',
    select: 'Choose an entity to see its accounts',
    crud: {
      edit: 'Edit',
      accountNumber: 'Account number',
      status: 'Status',
      entity: 'Entity',
      addAc: 'Add account',
      editAc: 'Edit account'
    }
  },
  user: {
    title: 'Users',
    add: 'Add new user',
    crud: {
      edit: 'Edit',
      user: 'User',
      userData: 'User info',
      entity: 'Entity',
      role: 'Role',
      status: 'Status',
      addUser: 'Add user',
      editUser: 'Edit user'
    }
  }
};
