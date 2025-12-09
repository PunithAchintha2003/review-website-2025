export const baseURL = "http://localhost:8080"

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    forgot_password : {
        url : '/api/user/forgot-password',
        method : 'put'
    },
    forgot_password_otp_verification : {
        url : '/api/user/verify-forgot-password-otp',
        method : 'put'
    },
    reset_password : {
        url : '/api/user/reset-password',
        method : 'put'
    },
    refreshToken : {
        url : '/api/user/refresh-toke',
        method : 'post'
    },
    userDetails : {
        url : '/api/user/user-details',
        method : 'get'
    },
    logout : {
        url : '/api/user/logout',
        method : 'get'
    },
    updateUserDetails : {
        url : '/api/user/update-user',
        method : 'put'
    },
    uploadImage : {
        url : '/api/file/upload',
        method : 'post'
    },
    addCategory : {
        url : '/api/category/add-category',
        method : 'post'
    },
    getCategory : {
        url : '/api/category/get',
        method : 'get'
    },
    updateCategory : {
        url : '/api/category/update',
        method : 'put'
    },
    deleteCategory : {
        url : '/api/category/delete',
        method : 'delete'
    },
    addFilm : {
        url : '/api/movie/create',
        method : 'post'
    },
    getFilm : {
        url : '/api/movie/',
        method : 'get'
    },
    updateFilm : {
        url : '/api/movie/update',
        method : 'put'
    },
    deleteFilm : {
        url : '/api/movie/delete/',
        method : 'delete'
    },
    addSong : {
        url : '/api/song/create',
        method : 'post'
    },
    getSong : {
        url : '/api/song/',
        method : 'get'
    },
    updateSong : {
        url : '/api/song/update',
        method : 'put'
    },
    deleteSong : {
        url : '/api/song/delete/',
        method : 'delete'
    },
    addTeledrama : {
        url : '/api/teledrama/create',
        method : 'post'
    },
    getTeledrama : {
        url : '/api/teledrama/',
        method : 'get'
    },
    updateTeledrama : {
        url : '/api/teledrama/update',
        method : 'put'
    },
    deleteTeledrama : {
        url : '/api/teledrama/delete/',
        method : 'delete'
    },
    addBook : {
        url : '/api/book/create',
        method : 'post'
    },
    getBook : {
        url : '/api/book/',
        method : 'get'
    },
    updateBook : {
        url : '/api/book/update',
        method : 'put'
    },
    deleteBook : {
        url : '/api/book/delete/',
        method : 'delete'
    },
    payment_url : {
        url : '/api/order/checkout',
        method : 'post'
    },
    all_users : {
        url : '/api/user/all-users',
        method : 'get'
    }
}
export default SummaryApi

