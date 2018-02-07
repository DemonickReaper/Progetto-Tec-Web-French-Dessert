<?php
class MyDB extends SQLite3
{
    function __construct()
    {
        $this->open('progetto.db');
    }
}
$db = new MyDB();
if (!$db) {
    echo $db->lastErrorMsg();
} else {
    echo "Opened database successfully\n";
}

$sql1 = <<<EOF
    CREATE TABLE LOGIN(
        username           VARCHAR(50)    NOT NULL UNIQUE,
        password            PASSWORD     NOT NULL,
        PRIMARY KEY (username));
EOF;

$sql2 = <<<EOF
CREATE TABLE ANNOTATIONS(
    id      INT       NOT NULL AUTOINCREMENT,
    pageid  VARCHAR(50)     NOT NULL,
    startt   VARCHAR(50)     NOT NULL,
    endd     VARCHAR(50)     NOT NULL,
    startoffset INT         NOT NULL,
    endoffset INT           NOT NULL,
    textt    TEXT    NOT NULL UNIQUE,
    user    VARCHAR(50),
    readd VARCHAR(30),
    updatee VARCHAR(30),
    deletee VARCHAR(30),
    adminn VARCHAR(30), 
    PRIMARY KEY (id),
    FOREIGN KEY (user) REFERENCES LOGIN(username)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
EOF;

$ret1 = $db->exec($sql1);
$ret2 = $db->exec($sql2);
if (!$ret1 && !$ret2) {
    echo $db->lastErrorMsg();
} else {
    echo "Table created successfully\n";
}
$db->close();
?>