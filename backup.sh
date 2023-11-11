# docker exec -e PGPASSWORD=your_password -t ebbinghaus-db pg_dump -U your_username -d your_database > ebbinghaus_backup.sql
docker exec -e PGPASSWORD=your_password -t ebbinghaus-db pg_dump -U postgres -d postgres > ebbinghaus_backup.sql

git add ebbinghaus_backup.sql
git commit -m "updated sql"
git push
