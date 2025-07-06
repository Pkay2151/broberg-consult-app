const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const clientRoutes = require('./routes/clientRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('🚀 Broberg Consult Backend is Live');
// });

// app.use('/api/clients', clientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
