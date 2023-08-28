require( 'dotenv' ).config();
require( 'colors' );

import express from 'express';
import Server from './models/Server';

const server = new Server();

server.execute();