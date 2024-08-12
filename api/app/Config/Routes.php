<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// $routes->get('/', 'Home::index');
$routes->get('/', 'Cupid::index');
$routes->post('store', 'Cupid::store');
$routes->post('storeComment', 'Cupid::storeComment');
