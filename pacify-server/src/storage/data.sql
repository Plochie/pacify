USE pacify;

INSERT INTO category (id, sid,`desc`,title) VALUES (0, '', '', '');

USE pacify;

INSERT INTO module
(
  id
 ,sid
 ,title
 ,width
 ,height
 ,icon
 ,categoryId
 ,createdAt
 ,updatedAt
 ,isStarter
 ,isShared
)
VALUES
(
  0 -- id - INT(11) NOT NULL
 ,'' -- sid - VARCHAR(255) NOT NULL
 ,'' -- title - VARCHAR(255) NOT NULL
 ,0 -- width - INT(11) NOT NULL
 ,0 -- height - INT(11) NOT NULL
 ,'' -- icon - VARCHAR(255)
 ,0 -- categoryId - INT(11)
 ,NOW() -- createdAt - DATETIME(6) NOT NULL
 ,NOW() -- updatedAt - DATETIME(6) NOT NULL
 ,0 -- isStarter - TINYINT(4) NOT NULL
 ,0 -- isShared - TINYINT(4) NOT NULL
);