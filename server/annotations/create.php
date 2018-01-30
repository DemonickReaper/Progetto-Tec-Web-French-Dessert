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
        USERNAME           VARCHAR(50)    NOT NULL UNIQUE,
        PASSWORD            PASSWORD     NOT NULL,
        PRIMARY KEY (USERNAME));
EOF;

$sql2 = <<<EOF
CREATE TABLE ANNOTATIONS(
    PAGEID  VARCHAR(50)     NOT NULL,
    START   VARCHAR(50)     NOT NULL,
    END     VARCHAR(50)     NOT NULL,
    STARTOFFSET INT         NOT NULL,
    ENDOFFSET INT           NOT NULL,
    MESSAGE    TEXT    NOT NULL UNIQUE,
    USER    VARCHAR(50),
    PRIMARY KEY (PAGEID),
    FOREIGN KEY (USER) REFERENCES LOGIN(USERNAME)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION);
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