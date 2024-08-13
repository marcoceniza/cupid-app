<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
// Message
$routes->get('/', 'Message::index');
$routes->post('store-message', 'Message::store');

// Comment
$routes->get('comments/(:num)', 'Comment::index/$1');
$routes->post('store-comment', 'Comment::store');
