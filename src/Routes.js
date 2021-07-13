import Dashboard from './pages/dashboard';
import Designer from './pages/designer';
const Routes =  [
   {
        id:2,
        path:'/',
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