import Auth from './pages/auth'
import Dashboard from './pages/dashboard';
import Designer from './pages/designer';
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
    },{
        id:3,
        path:'/form/:id',
        page:Designer,
        exact:true
    }
];

export default Routes;