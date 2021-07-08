import Auth from './pages/auth'
import Dashboard from './pages/dashboard';
const Routes =  [
    {
        id:1,
        path:'/',
        page:Auth,
        exact:true
    },{
        id:2,
        path:'/home',
        page:Dashboard,
        exact:true
    }
];

export default Routes;