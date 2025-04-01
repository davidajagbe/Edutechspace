import { Link } from 'react-router-dom';
import edu1 from '../assets/images/edu1.jpg';
import edu2 from '../assets/images/edu2.jpg';

const Hero = () => {
  return (
    <section className="overflow-hidden flex flex-wrap">
      {/* Left Column */}
      <div className="w-full md:w-1/2 relative" style={{ height: '860px' }}>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={edu1}
          alt="Hero Background 1"
        />
        <div className="absolute left-5 sm:left-10 right-5 sm:right-10 bottom-10">
          <h1 className="font-heading mb-8 text-6xl sm:text-9xl xl:text-10xl text-white font-semibold max-w-4xl">
            <span>Learn.</span>{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Grow.</span>
              <span
                style={{ backgroundColor: '#08F1FF' }}
                className="absolute -bottom-2 left-0 h-1 w-full bg-green-200 rounded-full"
              ></span>
            </span>{' '}
            <span>Build.</span>
          </h1>
          <p className="text-xl font-medium text-white mb-10 tracking-tight">
            Your journey to digital excellence starts here.
          </p>
          <Link
            className="inline-flex justify-center items-center text-center h-20 p-5 font-semibold tracking-tight text-2xl text-white bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-800 rounded-lg focus:ring-4 focus:ring-neutral-400 transition duration-200"
            to="/course"
          >
            I Want Free Learning
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 relative" style={{ height: '860px' }}>
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={edu2}
          alt="Hero Background 2"
        />
        <div className="absolute left-5 sm:left-10 right-5 sm:right-10 bottom-10">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="flex items-start flex-wrap gap-6">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle cx="24" cy="24" r="24" fill="white" />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M17.9176 11.7658L15.0151 10L17.9176 8.23417C18.2196 8.05332 18.4825 7.81416 18.691 7.53063C18.8995 7.24711 19.0495 6.92489 19.1322 6.58279C19.2149 6.24069 19.2286 5.88554 19.1726 5.53808C19.1166 5.19061 18.9919 4.85778 18.8059 4.559C18.6199 4.26022 18.3762 4.00148 18.0891 3.79786C17.8021 3.59425 17.4773 3.44984 17.1338 3.37306C16.7904 3.29628 16.435 3.28866 16.0886 3.35066C15.7421 3.41266 15.4115 3.54303 15.116 3.73417L12.501 5.40833V2.5C12.501 1.83696 12.2376 1.20107 11.7687 0.732233C11.2999 0.263392 10.664 0 10.001 0C9.33793 0 8.70205 0.263392 8.23321 0.732233C7.76437 1.20107 7.50098 1.83696 7.50098 2.5V5.49L4.88597 3.73417C4.28962 3.37698 3.57683 3.26834 2.90114 3.43164C2.22546 3.59495 1.64096 4.01713 1.27356 4.60725C0.906154 5.19736 0.785255 5.90818 0.936903 6.58658C1.08855 7.26498 1.50061 7.85666 2.08431 8.23417L4.98681 10L2.08431 11.7658C1.50061 12.1433 1.08855 12.735 0.936903 13.4134C0.785255 14.0918 0.906154 14.8026 1.27356 15.3927C1.64096 15.9829 2.22546 16.4051 2.90114 16.5684C3.57683 16.7317 4.28962 16.623 4.88597 16.2658L7.50098 14.5675V17.5C7.50098 18.163 7.76437 18.7989 8.23321 19.2678C8.70205 19.7366 9.33793 20 10.001 20C10.664 20 11.2999 19.7366 11.7687 19.2678C12.2376 18.7989 12.501 18.163 12.501 17.5V14.5167L15.116 16.2667C15.7123 16.6239 16.4251 16.7325 17.1008 16.5692C17.7765 16.4059 18.361 15.9837 18.7284 15.3936C19.0958 14.8035 19.2167 14.0927 19.065 13.4143C18.9134 12.7359 18.5013 12.1433 17.9176 11.7658Z"
                        fill="#19191B"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <h6 className="font-heading text-white text-2xl sm:text-4xl tracking-tight font-semibold w-56 sm:w-auto sm:max-w-xs">
                RTS Student Certifications
              </h6>
            </div>
            <Link className="flex items-center flex-wrap gap-3 group" to="/signup">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="27"
                viewBox="0 0 24 27"
                fill="none"
              >
                <path
                  d="M22.5 10.9019C24.5 12.0566 24.5 14.9434 22.5 16.0981L5.24999 26.0574C3.24999 27.2121 0.749999 25.7687 0.749999 23.4593L0.75 3.5407C0.75 1.2313 3.25 -0.212069 5.25 0.942631L22.5 10.9019Z"
                  fill="#08F1FF"
                />
              </svg>
              <h6 className="font-heading text-white text-xl font-semibold tracking-tight group-hover:text-opacity-80 transition duration-200">
                Register
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
