function Footer() {
  return (
    <footer className="flex items-center justify-center bg-stone-800 px-6 py-4">
      <p className="font-semibold text-stone-300">
        Powered by &nbsp;
        <a className="underline" href="https://sdk.vercel.ai" target="_blank">IA SDK</a> 🤖 
        using &nbsp;
        <a className="underline" href="https://boardgamegeek.com" target="_blank">BGG</a> data 📊
      </p>
    </footer>
  );
}

export default Footer;
