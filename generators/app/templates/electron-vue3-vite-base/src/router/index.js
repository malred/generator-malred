// router/index

import { createRouter, createWebHistory } from 'vue-router'
const SearchBar = () => import('../views/SearchBar.vue')
const Home = () => import('../views/Home.vue')
const About = () => import('../views/About/About.vue')
const routes = [
    { path: '/', name: '/', component: Home },
    { path: '/searchBar', name: 'searchBar', component: SearchBar },
    { path: '/home', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


