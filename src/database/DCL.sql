use pyaoriDb;
create user if not exists pyaoriPublic identified by '7Uq9GWSdMkZR$cNe';

grant select, insert, update, delete on pyaoriDb.* to pyaoriPublic;
flush privileges;

/*
drop user pyaoriPublic;
select * from mysql.user;
*/