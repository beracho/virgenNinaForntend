import error from './errors';
import validate from './validates';
import menu from './menu';

export default {
  error,
  validate,
  menu,
  app: {
    title: 'Sistema Virgen Niña',
    account: 'Mi cuenta',
    settings: 'Configuración',
    logOut: 'Cerrar sesión'
  },
  login: {
    title: 'Inicia tu sesión',
    user: 'Nombre de usuario',
    password: 'Contraseña',
    rememberMe: 'Recuérdame',
    forgotPass: '¿Olvidó su contraseña?',
    login: 'Ingresar',
    noAccount: '¿No tienes una cuenta?',
    signUp: 'Registrate aquí'
  },
  loginAdmin: {
    title: 'Inicia sesión de Administrador',
    user: 'Nombre de usuario',
    password: 'Contraseña',
    rememberMe: 'Recuérdame',
    forgotPass: '¿Olvidó su contraseña?',
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
    add: 'Agregar',
    required: 'Campo obligatorio',
    cancel: 'Cancelar',
    save: 'Guardar',
    rowsPage: 'Filas por página',
    updateList: 'Actualizar esta lista',
    filters: 'Filtros/búsqueda',
    of: 'de',
    active: 'Activo',
    edit: 'Editar',
    status: 'Estado',
    actions: 'Acciones'
  },
  entity: {
    title: 'Entidades',
    add: 'Agregar nueva entidad',
    crud: {
      edit: 'Editar',
      code: 'Código',
      acronym: 'Sigla',
      description: 'Descripción',
      status: 'Estado',
      addEnt: 'Agregar entidad',
      editEnt: 'Editar entidad'
    }
  },
  account: {
    title: 'Cuentas',
    add: 'Agregar nueva cuenta',
    select: 'Seleccione una entidad para ver sus cuentas',
    crud: {
      edit: 'Editar',
      accountNumber: 'Nro. de cuenta',
      status: 'Estado',
      entity: 'Entidad',
      addAc: 'Agregar cuenta',
      editAc: 'Editar cuenta'
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
