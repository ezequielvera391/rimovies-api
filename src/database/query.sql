-- CREATE DATABASE Rimovies; Ejecutar primero este comando y luego lo otro

USE Rimovies;

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE directors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    sinopsis TEXT NOT NULL,
    year INT NOT NULL,
    director_id INT NOT NULL,
    category_id INT NOT NULL,
    cover VARCHAR(255),
    was_watched BIT NOT NULL,
    rating DECIMAL(3, 1) DEFAULT 0,
    FOREIGN KEY (director_id) REFERENCES directors(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE actors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

CREATE TABLE actorsMovies (
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (actor_id) REFERENCES actors(id)
);