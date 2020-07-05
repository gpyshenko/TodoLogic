const HomePage = import('views/Home.vue');
const NotePage = import('views/Note');

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => HomePage
    },
    {
        path: '/note',
        name: 'Note',
        component: () => NotePage
    }
];

export default routes;
