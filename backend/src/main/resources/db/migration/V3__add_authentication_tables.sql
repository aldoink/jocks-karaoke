CREATE TABLE IF NOT EXISTS USERS
(
    ID       INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    EMAIL    VARCHAR(50)  NULL UNIQUE,
    USERNAME VARCHAR(20)  NULL UNIQUE,
    PASSWORD VARCHAR(120) NULL
);

CREATE TABLE IF NOT EXISTS ROLES
(
    ID   INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(20) NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS USER_ROLES
(
    USER_ID INT NOT NULL,
    ROLE_ID INT NOT NULL,
    PRIMARY KEY (USER_ID, ROLE_ID),
    INDEX (USER_ID),
    INDEX (ROLE_ID),
    FOREIGN KEY (USER_ID) REFERENCES USERS (ID) ON DELETE CASCADE,
    FOREIGN KEY (ROLE_ID) REFERENCES ROLES (ID) ON DELETE CASCADE
);

INSERT IGNORE INTO ROLES(NAME) VALUES ('ROLE_USER');
INSERT IGNORE INTO ROLES(NAME) VALUES ('ROLE_ADMIN');