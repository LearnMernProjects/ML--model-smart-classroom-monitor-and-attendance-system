'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

import ProgressDashboard from '../app/StudentYaTeacher/page.jsx';
import StudentYaTeacherPage from "./StudentYaTeacher/page.js"
import RoleSelectionPage from './RoleSelectionPage.jsx';

export default function Slider() {
  const _router = useRouter();
  
  useEffect(() => {
    const splide = new Splide('.splide', {
      type: 'loop',
      perPage: 1,
      autoplay: true,
    });

    const bar = document.querySelector('.my-slider-progress-bar');

    splide.on('mounted move', function () {
      const end = splide.Components.Controller.getEnd() + 1;
      const rate = Math.min((splide.index + 1) / end, 1);
      bar.style.width = `${100 * rate}%`;
    });

    splide.mount();
  }, []);

  return (
    <div className="info">
      <div className="splide mt-6 bg-red-100 border-red-730">
        <div className="splide__track">
          <ul className="splide__list">
            <li
              className="splide__slide cursor-pointer text-center"
              onClick={() => window.location.href = "http://localhost:3001/RoleSelectionPage"}
            >
              <img src="./student1.jpg" width="73" height="73" className="img3 mx-auto" />
              Student
            </li>

            <li
              className="splide__slide cursor-pointer text-center"
              onClick={() => window.location.href = "http://localhost:3001/RoleSelectionPage"}
            >
              <img src="./teacher1.jpg" width="73" height="73" className="img3 mx-auto" />
              Teacher
            </li>

            <li
              className="splide__slide cursor-pointer text-center"
              onClick={() => window.location.href = "http://localhost:3001/RoleSelectionPage"}
            >
              <img src="./il.jpg" width="73" height="73" className="img3 mx-auto" />
              Administrator
            </li>
          </ul>
        </div>

        {/* Progress Bar */}
        <div className="my-slider-progress mt-2">
          <div className="my-slider-progress-bar"></div>
        </div>
      </div>

      {/* Inline style for progress bar */}
      <style jsx>{`
        .my-slider-progress {
          background: #ccc;
        }

        .my-slider-progress-bar {
          background: red;
          height: 2px;
          transition: width 400ms ease;
          width: 0;
        }
      `}</style>
    </div>
  );
}