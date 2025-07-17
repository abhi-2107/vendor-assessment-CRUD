## To run the code follow steps given below

1. clone git repo
2. run command `npm install`
3. To start a fake API server run- `npx json-server db.json`  
   API will be served on `http://localhost:3000/vendors`

- GET /vendors
- GET /vendors/:id
- POST /vendors
- PUT /vendors/:id
- PATCH /vendors/:id
- DELETE /vendors/:id
- GET /vendors?_page=1&_per_page=25

4. to start dev server run `npm run dev` on new terminal. UI will show up on `http://localhost:5173/`

---

Hint : To work with searchbar plase use exact name or vendorId etc. as json-server only supports exact match from database

## Demo

https://drive.google.com/file/d/1WSEvJakJED4wFVG1Ke_Ji3muPU6Jlb3X/view?usp=sharing
