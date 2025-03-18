import { Link } from 'react-router-dom';

const Course = () => {
  return (
    <section className="bg-neutral-100 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl sm:text-9xl xl:text-6xl font-semibold mb-14 tracking-tight font-heading text-blue-950">All Courses</h1>
        <div className="w-full h-px bg-neutral-900 mb-2"></div>
        <h2 className="text-4xl font-semibold mb-8 tracking-tight font-heading"></h2>
        {/* RUNTECHSPACE Courses Section */}
        <div className="bg-white rounded-3xl px-12 py-10 mb-6 shadow-lg flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-4xl font-medium tracking-tight font-heading text-blue-950">
              RUNTECHSPACE Courses
            </h2>
            <p className='text-slate-900 text-lg'>Looking to start something new?</p>
          </div>
          <div className="w-full lg:w-1/2 p-4 flex items-center justify-end flex-wrap gap-12">
            <h3 class="text-blue-950 text-xl font-semibold tracking-tight font-heading">Our Training Programs</h3>
            <Link
              className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-lg text-white bg-blue-950 hover:bg-slate-900 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200"
              to="/coursedatabase"
            >
              Start Learning
            </Link>
          </div>
        </div>
        {/* Free Course Database Section */}
        <div className="bg-white rounded-3xl px-12 py-10 mb-2 shadow-lg flex flex-wrap items-center">
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-4xl font-medium tracking-tight font-heading text-blue-950">
              Free Course Database
            </h2>
            <p className='text-slate-900 text-lg'>Browse through our various free courses with certificates globally.</p>
          </div>
          <div className="w-full lg:w-1/2 p-4 flex items-center justify-end flex-wrap gap-12">
            <h2 class="text-slate-600 text-xl font-semibold tracking-tight font-heading">Global Database of Free Courses with Certificates</h2>
            <span className="inline-flex justify-center items-center text-center h-16 p-5 font-semibold tracking-tight text-lg text-white bg-slate-300 rounded-lg cursor-not-allowed">
              Coming Soon...
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Course;
