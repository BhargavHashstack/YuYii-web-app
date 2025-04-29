import React, { useState } from 'react';

const GuestSelection = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([null]);
  const [adultsAges, setAdultsAges] = useState([null, null]); // New state for adults' ages
  const [pets, setPets] = useState(0);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleChildrenChange = (count) => {
    setChildren(count);
    const newAges = [...childrenAges];
    if (count > childrenAges.length) {
      for (let i = childrenAges.length; i < count; i++) {
        newAges.push(0);
      }
    } else {
      newAges.length = count;
    }
    setChildrenAges(newAges);
  };

  const handleAdultsChange = (count) => {
    setAdults(count);
    const newAges = [...adultsAges];
    if (count > adultsAges.length) {
      for (let i = adultsAges.length; i < count; i++) {
        newAges.push(0);
      }
    } else {
      newAges.length = count;
    }
    setAdultsAges(newAges);
  };

  const handleAgeChange = (index, value, type) => {
    const newAges = type === 'children' ? [...childrenAges] : [...adultsAges];
    newAges[index] = value;
    type === 'children' ? setChildrenAges(newAges) : setAdultsAges(newAges);
  };

  return (
    <div className="max-w-md mx-auto p-4">
        <h4 className="text-[#828282] text-sm font-poppins font-semibold mb-4">Guests</h4>
      <div className="relative w-full text-xl ">
        
        <button
          onClick={toggleDropdown}
          className="w-full border p-2 text-left bg-white rounded-sm focus:outline-none"
        >
          {adults + children + pets} <span className="float-right pt-2">{showDropdown ? <svg width="13" height="11" viewBox="0 0 19 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7324 9.15918L9.4646 1.89136L2.19678 9.15918" stroke="#1E1E1E" stroke-width="2.90713" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

 : <svg width="13" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M1.67383 1.87402L8.94165 9.14184L16.2095 1.87402" stroke="#1E1E1E" stroke-width="2.90713" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
 }</span>
        </button>
        {showDropdown && (
          <div className="absolute z-20 w-[130%] sm:w-[150%] bg-white border mt-1 p-4 rounded-sm shadow-md">
            {/* Adults Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-base sm:text-lg space-x-2">
                <span role="img" aria-label="adults"><svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1744 11.3757C16.3921 10.1261 17.0709 8.43919 17.0624 6.68426C17.0538 4.92933 16.3585 3.24931 15.1286 2.01194C13.8985 0.774591 12.2345 0.0800781 10.5 0.0800781C8.76551 0.0800781 7.10149 0.774591 5.87135 2.01194C4.64188 3.24926 3.94681 4.92901 3.93824 6.68364C3.92968 8.43827 4.60831 10.1249 5.82565 11.3744C4.11152 12.0558 2.63945 13.2429 1.60058 14.7816C0.561707 16.3204 0.00404188 18.1396 0 20.0032C0 20.7357 0.588 21.3294 1.31312 21.3294H19.6869C20.412 21.3294 21 20.7357 21 20.0019C20.9955 18.1388 20.4376 16.3201 19.3987 14.7819C18.3599 13.2436 16.8881 12.0569 15.1744 11.3757ZM10.5 2.74569C11.0228 2.73615 11.5422 2.83209 12.0279 3.0279C12.5137 3.22371 12.956 3.51547 13.3291 3.88614C13.7022 4.25682 13.9986 4.69899 14.201 5.18684C14.4034 5.67469 14.5077 6.19845 14.5078 6.72754C14.508 7.25663 14.404 7.78046 14.2019 8.26844C13.9999 8.75641 13.7037 9.19877 13.3309 9.56969C12.958 9.9406 12.5159 10.2326 12.0302 10.4288C11.5446 10.6249 11.0253 10.7211 10.5025 10.7119C9.47058 10.6938 8.48699 10.2663 7.76348 9.52156C7.03998 8.77683 6.6344 7.77438 6.63408 6.73004C6.63375 5.68571 7.03871 4.683 7.76175 3.9378C8.4848 3.19261 9.46812 2.76451 10.5 2.74569ZM2.75594 18.6744C3.06109 17.1758 3.86742 15.8295 5.03906 14.8622C6.2107 13.895 7.67603 13.366 9.18812 13.3644H11.8131C13.325 13.3663 14.79 13.8954 15.9614 14.8626C17.1328 15.8298 17.939 17.176 18.2441 18.6744H2.75594Z" fill="#DE1587"/>
</svg>
</span>
                <span >Adults</span>
              </div>
              <div className="flex items-center text-base sm:text-lg border border-[#DBDBDB] space-x-2">
                <button
                  onClick={() => handleAdultsChange(Math.max(1, adults - 1))}
                  className="px-1 py-1 sm:px-2 sm:py-2 font-poppins text-[#DE1587]"
                >
                  <svg  width="16" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.13091 2.84874H22.7335C23.3656 2.84874 23.8781 2.33629 23.8781 1.70416C23.8781 1.07202 23.3656 0.55957 22.7335 0.55957H2.13091C1.49878 0.55957 0.986328 1.07202 0.986328 1.70416C0.986328 2.33629 1.49878 2.84874 2.13091 2.84874Z" fill="#DE1587"/>
</svg>

                </button>
                <span>{adults}</span>
                <button
                  onClick={() => handleAdultsChange(adults + 1)}
                  className="px-1 py-1 sm:px-2 sm:py-1 font-poppins text-[#DE1587]"
                >
                  <svg width="16" height="16" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3853 10.5601V1.40338C10.3853 0.771238 10.8977 0.258789 11.5298 0.258789C12.162 0.258789 12.6744 0.771238 12.6744 1.40338V10.5601H21.8311C22.4633 10.5601 22.9757 11.0725 22.9757 11.7047C22.9757 12.3368 22.4633 12.8492 21.8311 12.8492H12.6744V22.0059C12.6744 22.6381 12.162 23.1505 11.5298 23.1505C10.8977 23.1505 10.3853 22.6381 10.3853 22.0059V12.8492H1.22857C0.596433 12.8492 0.0839844 12.3368 0.0839844 11.7047C0.0839844 11.0725 0.596433 10.5601 1.22857 10.5601H10.3853Z" fill="#DE1587"/>
</svg>

                </button>
              </div>
            </div>

            {/* Adults Ages Section */}
{adults > 0 && (
  <div className="mb-4">
    <div className="flex flex-col gap-4">
      {adultsAges.map((age, index) => (
        <div key={index} className="flex flex-col">
          <label className="text-sm font-poppins mb-2 text-black">
            Adult age
          </label>
          <input
            type="number"
            min="0"
            value={age ||''}
            onChange={(e) => handleAgeChange(index, e.target.value, 'adults')}
            placeholder="Enter age"
            className="w-full px-2 py-1 text-base sm:text-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      ))}
    </div>
  </div>
)}

            {/* Children Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-base sm:text-lg space-x-2">
                <span role="img" aria-label="children"><svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.3715 1.54928C17.1304 1.39429 16.8463 1.31861 16.5593 1.33299C16.2724 1.34737 15.9974 1.45108 15.7733 1.62939C15.4307 1.90182 15.0299 2.09319 14.6015 2.18895C14.1731 2.28471 13.7283 2.28233 13.3009 2.182L7.23958 0.736075C6.78109 0.632549 6.30365 0.645559 5.85159 0.773897C5.39952 0.902236 4.98748 1.14174 4.65369 1.47019L3.17618 2.95161H2.79479C1.28355 2.95161 0.0493941 4.18257 0.0432592 5.68427C0.0268993 6.08884 -0.0487653 8.15025 0.0493942 8.94014C0.0974514 9.33458 0.252871 10.021 0.509517 10.9833C0.281591 11.3297 0.161079 11.7347 0.162891 12.1484V12.7618C0.161428 13.2708 0.343891 13.7635 0.677216 14.1506C1.01054 14.5377 1.47267 14.7936 1.97986 14.8719C2.14453 15.8402 2.53373 16.7574 3.11679 17.5512C3.69985 18.3449 4.46084 18.9936 5.33978 19.4459V20.7174C5.33951 20.828 5.3612 20.9375 5.4036 21.0397C5.446 21.1419 5.50829 21.2348 5.58691 21.3131C5.66552 21.3915 5.75893 21.4537 5.86179 21.4962C5.96465 21.5388 6.07496 21.5608 6.18641 21.5611C6.41131 21.5603 6.6267 21.471 6.78525 21.3128C6.9438 21.1546 7.03256 20.9405 7.03201 20.7174V20.034C7.83774 20.1922 8.668 20.1922 9.47986 20.034V20.7174C9.47986 21.1829 9.86023 21.5611 10.3265 21.5611C10.7927 21.5611 11.1711 21.1829 11.1711 20.7174V19.4459C11.713 19.1661 12.2116 18.8107 12.6516 18.3904C13.6378 17.4443 14.2958 16.2124 14.531 14.8719C15.0384 14.7938 15.5007 14.538 15.8343 14.1509C16.1678 13.7638 16.3504 13.271 16.349 12.7618V12.1484C16.349 11.7123 16.214 11.2865 15.9655 10.9296L17.9563 3.03171C18.0286 2.75502 18.011 2.46276 17.906 2.19658C17.801 1.9304 17.6139 1.70388 17.3715 1.54928ZM2.79479 4.62771H3.52485C3.7498 4.62771 3.96146 4.54051 4.11995 4.38131L5.84285 2.65249C6.10052 2.39494 6.4952 2.28036 6.84796 2.36655L12.9083 3.81247C13.9983 4.06719 15.1445 3.91789 16.1312 3.39269L15.9604 4.07002L14.6251 9.36804V8.74039C14.6247 8.60966 14.5938 8.48079 14.5349 8.36382C14.4761 8.24686 14.3907 8.14497 14.2856 8.06609C14.1797 7.98841 14.057 7.9364 13.9272 7.91421C13.7974 7.89202 13.6641 7.90029 13.5381 7.93833C11.0044 8.72011 8.7631 8.68462 7.11892 7.83896C5.94408 7.23463 5.43692 6.40825 5.42158 6.3829C5.33 6.22223 5.18775 6.09582 5.0167 6.0231C4.84565 5.95038 4.65525 5.93536 4.47475 5.98035C4.29501 6.02816 4.13623 6.1335 4.02307 6.28C3.90991 6.42651 3.84871 6.60597 3.84899 6.79051C3.84899 7.79435 3.73856 7.90589 2.668 7.97788C2.45516 7.99373 2.2562 8.08872 2.11097 8.24383C1.96574 8.39895 1.88495 8.60274 1.88477 8.81441V9.57489C1.81525 9.29782 1.75895 9.01765 1.71606 8.73532C1.65164 8.21718 1.68539 6.62422 1.7222 5.70759C1.7222 5.11137 2.20379 4.62771 2.79479 4.62771ZM1.84285 12.1484C1.84285 11.8959 2.0453 11.6911 2.29377 11.6911H2.72424C2.94743 11.69 3.1611 11.6012 3.31845 11.4442C3.47579 11.2873 3.56398 11.0748 3.56371 10.8535V9.5465C4.31729 9.38629 4.83263 9.05979 5.14551 8.5386C5.49738 8.82842 5.87839 9.08156 6.28252 9.29402C8.0862 10.2461 10.3848 10.4287 12.9471 9.83447V10.8535C12.9471 11.3159 13.3234 11.6911 13.7866 11.6911H14.2161C14.4656 11.6911 14.668 11.8959 14.668 12.1484V12.7618C14.6691 12.8818 14.6221 12.9974 14.5374 13.0831C14.4527 13.1689 14.3371 13.2178 14.2161 13.2191H13.7774C13.5615 13.2196 13.3541 13.3025 13.198 13.4504C13.0419 13.5984 12.9492 13.8002 12.939 14.0141C12.8947 14.9068 12.5951 15.7687 12.0753 16.4989C11.5555 17.2291 10.8369 17.7976 10.0034 18.1379C8.87384 18.5933 7.60903 18.59 6.48191 18.1288C4.80604 17.4423 3.66289 15.826 3.56984 14.0131C3.55961 13.7992 3.46688 13.5974 3.31081 13.4494C3.15475 13.3015 2.94731 13.2186 2.7314 13.2181H2.29377C2.23388 13.2174 2.17471 13.2051 2.11964 13.1817C2.06457 13.1584 2.01467 13.1245 1.9728 13.0821C1.93092 13.0396 1.8979 12.9894 1.8756 12.9342C1.8533 12.8791 1.84218 12.8202 1.84285 12.7608V12.1484Z" fill="#DE1587"/>
</svg>

</span>
                <span>Children</span>
              </div>
              <div className="flex items-center text-base sm:text-xl border border-[#DBDBDB] space-x-2">
                <button
                  onClick={() => handleChildrenChange(Math.max(0, children - 1))}
                  className="px-1 py-1 sm:px-2 sm:py-2 font-poppins text-[#DE1587]"
                >
                  <svg width="16" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.13091 2.84874H22.7335C23.3656 2.84874 23.8781 2.33629 23.8781 1.70416C23.8781 1.07202 23.3656 0.55957 22.7335 0.55957H2.13091C1.49878 0.55957 0.986328 1.07202 0.986328 1.70416C0.986328 2.33629 1.49878 2.84874 2.13091 2.84874Z" fill="#DE1587"/>
</svg>

                </button>
                <span>{children}</span>
                <button
                  onClick={() => handleChildrenChange(children + 1)}
                  className="px-1 py-1 sm:px-2 sm:py-1 font-poppins text-lg text-[#DE1587]"
                >
                  <svg width="16" height="16" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3853 10.5601V1.40338C10.3853 0.771238 10.8977 0.258789 11.5298 0.258789C12.162 0.258789 12.6744 0.771238 12.6744 1.40338V10.5601H21.8311C22.4633 10.5601 22.9757 11.0725 22.9757 11.7047C22.9757 12.3368 22.4633 12.8492 21.8311 12.8492H12.6744V22.0059C12.6744 22.6381 12.162 23.1505 11.5298 23.1505C10.8977 23.1505 10.3853 22.6381 10.3853 22.0059V12.8492H1.22857C0.596433 12.8492 0.0839844 12.3368 0.0839844 11.7047C0.0839844 11.0725 0.596433 10.5601 1.22857 10.5601H10.3853Z" fill="#DE1587"/>
</svg>
                </button>
              </div>
            </div>

            {/* Children Ages Section */}
{children > 0 && (
  <div className="mb-4">
    <div className="flex flex-col gap-4">
      {childrenAges.map((age, index) => (
        <div key={index} className="flex flex-col">
          <label className="text-sm font-poppins mb-2 text-black">
            Child age
          </label>
          <input
            type="number"
            min="0"
            value={age ||''}
            onChange={(e) => handleAgeChange(index, e.target.value, 'children')}
            placeholder="Enter age"
            className="w-full px-2 py-1 text-base sm:text-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      ))}
    </div>
  </div>
)}

            {/* Pets Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-base sm:text-lg space-x-2">
                <span role="img" aria-label="pets"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.001 8.52148C1.44133 8.52148 0.967917 8.32823 0.58075 7.94173C0.193583 7.5554 0 7.08232 0 6.52248C0 5.96282 0.19325 5.4894 0.57975 5.10223C0.966083 4.71507 1.43917 4.52148 1.999 4.52148C2.55867 4.52148 3.03208 4.71473 3.41925 5.10123C3.80642 5.48757 4 5.96065 4 6.52048C4 7.08015 3.80675 7.55357 3.42025 7.94073C3.03392 8.3279 2.56083 8.52148 2.001 8.52148ZM6.501 4.52148C5.94133 4.52148 5.46792 4.32823 5.08075 3.94173C4.69358 3.5554 4.5 3.08232 4.5 2.52248C4.5 1.96282 4.69325 1.4894 5.07975 1.10223C5.46608 0.715067 5.93917 0.521484 6.499 0.521484C7.05867 0.521484 7.53208 0.714734 7.91925 1.10123C8.30642 1.48757 8.5 1.96065 8.5 2.52048C8.5 3.08015 8.30675 3.55357 7.92025 3.94073C7.53392 4.3279 7.06083 4.52148 6.501 4.52148ZM12.501 4.52148C11.9413 4.52148 11.4679 4.32823 11.0807 3.94173C10.6936 3.5554 10.5 3.08232 10.5 2.52248C10.5 1.96282 10.6932 1.4894 11.0798 1.10223C11.4661 0.715067 11.9392 0.521484 12.499 0.521484C13.0587 0.521484 13.5321 0.714734 13.9193 1.10123C14.3064 1.48757 14.5 1.96065 14.5 2.52048C14.5 3.08015 14.3068 3.55357 13.9202 3.94073C13.5339 4.3279 13.0608 4.52148 12.501 4.52148ZM17.001 8.52148C16.4413 8.52148 15.9679 8.32823 15.5807 7.94173C15.1936 7.5554 15 7.08232 15 6.52248C15 5.96282 15.1932 5.4894 15.5798 5.10223C15.9661 4.71507 16.4392 4.52148 16.999 4.52148C17.5587 4.52148 18.0321 4.71473 18.4193 5.10123C18.8064 5.48757 19 5.96065 19 6.52048C19 7.08015 18.8067 7.55357 18.4202 7.94073C18.0339 8.3279 17.5608 8.52148 17.001 8.52148ZM4.15 18.5215C3.52817 18.5215 3.01442 18.2836 2.60875 17.8077C2.20292 17.3319 2 16.7698 2 16.1215C2 15.3062 2.28625 14.6087 2.85875 14.0292C3.43108 13.4497 3.98967 12.8626 4.5345 12.2677C5.01783 11.7382 5.43775 11.1725 5.79425 10.5705C6.15058 9.96865 6.564 9.40107 7.0345 8.86773C7.36283 8.4984 7.73425 8.18173 8.14875 7.91773C8.56342 7.65357 9.01383 7.52148 9.5 7.52148C10.0003 7.52148 10.4639 7.6484 10.8907 7.90223C11.3174 8.15607 11.6884 8.47398 12.0038 8.85598C12.4704 9.38932 12.8798 9.95798 13.2318 10.562C13.5836 11.1658 13.9948 11.7344 14.4655 12.2677C15.0103 12.8626 15.5689 13.4497 16.1413 14.0292C16.7138 14.6087 17 15.3062 17 16.1215C17 16.7698 16.7971 17.3319 16.3913 17.8077C15.9856 18.2836 15.4718 18.5215 14.85 18.5215C13.95 18.5215 13.0583 18.4465 12.175 18.2965C11.2917 18.1465 10.4 18.0715 9.5 18.0715C8.6 18.0715 7.70833 18.1465 6.825 18.2965C5.94167 18.4465 5.05 18.5215 4.15 18.5215Z" fill="#DE1587"/>
</svg>
</span>
                <span>Pets</span>
              </div>
              <div className="flex items-center text-base sm:text-xl  border border-[#DBDBDB] space-x-2">
                <button
                  onClick={() => setPets(Math.max(0, pets - 1))}
                  className="px-1 py-1 sm:px-2 sm:py-2 font-poppins text-[#DE1587]"
                >
                  <svg width="16" height="3" viewBox="0 0 24 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.13091 2.84874H22.7335C23.3656 2.84874 23.8781 2.33629 23.8781 1.70416C23.8781 1.07202 23.3656 0.55957 22.7335 0.55957H2.13091C1.49878 0.55957 0.986328 1.07202 0.986328 1.70416C0.986328 2.33629 1.49878 2.84874 2.13091 2.84874Z" fill="#DE1587"/>
</svg>

                </button>
                <span>{pets}</span>
                <button
                  onClick={() => setPets(pets + 1)}
                  className="px-1 py-1 sm:px-2 sm:py-1 font-poppins text-[#DE1587]"
                >
                  <svg width="16" height="16" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3853 10.5601V1.40338C10.3853 0.771238 10.8977 0.258789 11.5298 0.258789C12.162 0.258789 12.6744 0.771238 12.6744 1.40338V10.5601H21.8311C22.4633 10.5601 22.9757 11.0725 22.9757 11.7047C22.9757 12.3368 22.4633 12.8492 21.8311 12.8492H12.6744V22.0059C12.6744 22.6381 12.162 23.1505 11.5298 23.1505C10.8977 23.1505 10.3853 22.6381 10.3853 22.0059V12.8492H1.22857C0.596433 12.8492 0.0839844 12.3368 0.0839844 11.7047C0.0839844 11.0725 0.596433 10.5601 1.22857 10.5601H10.3853Z" fill="#DE1587"/>
</svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestSelection;
