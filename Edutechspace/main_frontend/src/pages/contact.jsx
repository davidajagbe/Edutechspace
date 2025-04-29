const contact = () => {
    return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h1>
          <p className="text-slate-600 mb-6">Have a question? We're here to help.</p>
          
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required className="border border-slate-500 p-3 rounded-lg w-full focus:ring focus:ring-slate-400" />
              <input type="text" placeholder="Last Name" required className="border border-slate-500 p-3 rounded-lg w-full focus:ring focus:ring-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="email" placeholder="Email" required className="border border-slate-500 p-3 rounded-lg w-full focus:ring focus:ring-slate-400" />
              <input type="tel" placeholder="Phone Number" required className="border border-slate-500 p-3 rounded-lg w-full focus:ring focus:ring-slate-400" />
            </div>
            <select required className="border border-slate-500 p-3 rounded-lg w-full focus:ring focus:ring-slate-400">
              <option value="" disabled>Select One...</option>
              <option value="general">General Inquiry</option>
              <option value="contact">contact us</option>
              <option value="feedback">Feedback</option>
            </select>
            <button type="submit" className="w-full bg-blue-950 text-white p-3 rounded-lg hover:bg-slate-900 transition">Send</button>
          </form>
        </div>
      </section>
    );
  };
  
  export default contact;