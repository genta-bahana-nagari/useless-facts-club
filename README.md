# 🥊 Useless Facts Fight Club

**Useless Facts Fight Club** is a fun and chaotic web app where weird, random trivia competes for the spotlight. Submit your own absurd facts, vote on others, and see which useless knowledge rises to the top. It's quirky, competitive, and totally unnecessary — in the best way.

---

## 🔧 Key Features

- 🧠 **Submit bizarre or completely useless facts**  
- 🔼 **Vote on your favorite facts to boost them on the leaderboard**  
- 🥊 **Real-time fact battles with ranking system**  
- 🎲 **Randomized discovery of new and obscure facts**  
- 💬 **Community-driven content and engagement**  
- 📱 **Fully responsive and mobile-friendly design**

---

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) 15 – React framework for fast, modern web apps  
- [Shadcn/UI](https://ui.shadcn.com/) – a set of reusable, customizable React components for building modern web interfaces
- [Prisma](https://www.prisma.io/) – Type-safe ORM for database management  
- [Neon](https://neon.tech/) – Serverless PostgreSQL hosting  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework  
- [Vercel](https://vercel.com/) – Hosting & serverless functions  

---

## 🌐 Deployment
This project is optimized for Vercel:
- Push to GitHub
- Import into Vercel
- Add your environment variable DATABASE_URL
- Deploy and enjoy!
---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone -b main --single-branch https://github.com/genta-bahana-nagari/useless-facts-fight-club.git
   cd useless-facts-fight-club
   ```
   > The `main` branch is stable and tested.

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   Create a .env file by copying the example:
   ```bash
   cp .env.example .env
   ```
   Update the following in .env:
   ```bash
   DATABASE_URL="your_neon_database_url"
   ```

4. **Push Prisma schema and generate Prisma Client:**
   ```bash
   npx prisma db push
   cp .env.example .env
   ```

5. **Run the local development server:**
   ```bash
   npm run dev
   ```

6. **Run the local Prisma Studio (optional):**
   ```bash
   npx prisma studio
   ```

---

## 🤝 Contributing

Contributions are always welcome!  
You can fork the repo and open a pull request — or clone and build locally first to test your changes.

---

## 🌟 Show Your Support
If you find this script helpful, feel free to ⭐ the repository and share it with others!

---

## 📜 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---