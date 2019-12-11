insert into movie (id, title, release_date, type) values
(1, 'Ocean''s 8', to_date('13/06/2018','dd/MM/yyyy'), 'action'),
(2, 'Solo: A Star Wars Story', to_date('23/05/2018','dd/MM/yyyy'), 'Sci-Fi'),
(3, 'Deadpool 2', to_date('16/05/2018','dd/MM/yyyy'), 'Comedy'),
(4, 'Avengers: Infinite War', to_date('25/04/2018','dd/MM/yyyy'), 'action'),
(5, 'The First Purge', to_date('04/07/2018','dd/MM/yyyy'), 'Horror'),
(6, 'Mission: Impossible - Fallout', to_date('01/08/2018','dd/MM/yyyy'), 'Thriller'),
(7, 'The Mummy', to_date('14/06/2017','dd/MM/yyyy'), 'Fantasy'),
(8, 'Hunger Games', to_date('21/03/2012','dd/MM/yyyy'), 'Thriller'),
(9, 'John Wick', to_date('29/10/2014','dd/MM/yyyy'), 'Thriller');

insert into director (id, name) values
(1, 'Gary Ross'),
(2, 'Ron Howard'),
(3, 'David Leitch'),
(4, 'Anthony Russo'),
(5, 'Joe Russo'),
(6, 'Gerard McMurray'),
(7, 'Christopher McQuarrie');


insert into movie_director (movie_id, director_id) values
(1,1),
(2,2),
(3,3),
(4,4),
(4,5),
(5,6),
(6,7),
(7,7),
(8,1),
(9,3);

insert into users (id,username,password,enabled) values
(1,'user','user',1);

insert into authorities (id,authority) values
(1,'ROLE_USER');

insert into users_authorities (user_id, authority_id) values
(1,1);