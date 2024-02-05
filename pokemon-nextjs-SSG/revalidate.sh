curl "http://localhost:3000/api/revalidate" \
-X POST \
-H "content-Type: application/json" \
-d "['/pokemon/1']"
