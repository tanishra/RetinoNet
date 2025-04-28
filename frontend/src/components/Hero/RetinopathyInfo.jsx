import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnalyzeSection from "./AnalyzeSection";

const DiabeticRetinopathyInfo = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [activeTab, setActiveTab] = useState('symptoms');
  const [showSymptomAlert, setShowSymptomAlert] = useState(false);
  const userId = 1; 



  // --- Data for Stages, Prevention Tips, Warning Signs (kept the same) ---
  const stages = [
    {
      id: 1,
      title: "No Diabetic Retinopathy (No DR)",
      description: "No signs of damage to the retina.",
      details: "At this stage, your retina is healthy with no visible signs of diabetes-related damage. Blood vessels are intact and functioning normally. The retina can properly process light signals and send them to the brain.",
      symptoms: "None - vision is normal at this stage.",
      treatment: "No specific treatment needed for the eyes, but managing diabetes is crucial to prevent progression.",
      risks: "If diabetes is not well-controlled, progression to early stages of retinopathy may occur within 5-10 years of diagnosis.",
      prevention: "Maintain healthy blood sugar levels, attend regular eye screenings, and follow your diabetes management plan."
    },
    {
      id: 2,
      title: "Mild Nonproliferative Retinopathy (Mild NPDR)", // Updated abbreviation
      description: "Small areas of retinal swelling.",
      details: "Small balloon-like swellings in the retina's tiny blood vessels, called microaneurysms, begin to form. These may leak small amounts of blood or fluid into the retina. The leakage may cause swelling in the macula, the central part of the retina responsible for sharp vision.",
      symptoms: "Often asymptomatic, but some may notice slight vision changes. Vision might become slightly blurry or fluctuate.",
      treatment: "Usually no immediate treatment required, but close monitoring with dilated eye exams every 6-12 months. Focus on improving diabetes control.",
      risks: "Approximately 30% of patients with mild NPDR progress to more severe stages within 5 years if diabetes remains poorly controlled.",
      prevention: "Strict blood sugar control, managing blood pressure and cholesterol, regular eye examinations."
    },
    {
      id: 3,
      title: "Moderate Nonproliferative Retinopathy (Moderate NPDR)", // Updated abbreviation
      description: "Blood vessels in the retina become more affected.",
      details: "As the disease progresses, blood vessels that nourish the retina become blocked. These blockages cause decreased blood flow to the retina, resulting in oxygen deprivation. The weakened vessels may bulge, causing additional microaneurysms, and larger areas of bleeding may occur. Yellow deposits called 'hard exudates' may become visible on retinal examination.",
      symptoms: "May begin to experience blurred vision, fluctuating vision, or difficulty with night vision. Some patients report seeing floating spots.",
      treatment: "More frequent monitoring (every 4-6 months). If macular edema develops, treatments such as anti-VEGF injections or laser therapy may be recommended.",
      risks: "Higher risk of developing diabetic macular edema (DME), which can significantly impact central vision. About 8% progress to proliferative DR annually.",
      prevention: "Intensive blood sugar control, blood pressure management, and lipid-lowering therapy when appropriate."
    },
    {
      id: 4,
      title: "Severe Nonproliferative Retinopathy (Severe NPDR)", // Updated abbreviation
      description: "Larger areas of the retina are affected.",
      details: "Many more blood vessels are blocked, depriving large areas of the retina of their blood supply. These oxygen-deprived areas begin to signal the body to grow new blood vessels for nourishment by releasing growth factors (VEGF). Nerve fiber layer infarctions (cotton wool spots) become visible, and venous beading (irregular vessel width) may occur.",
      symptoms: "More noticeable vision problems including blurred vision, dark or empty areas in vision, difficulty with color perception, and potential sudden vision changes.",
      treatment: "Closer monitoring (every 2-4 months). Anti-VEGF injections may be used. Some cases may benefit from pan-retinal photocoagulation (PRP) laser treatment to prevent progression.",
      risks: "More than 50% of patients with severe NPDR progress to proliferative DR within one year if left untreated. High risk of vision loss.",
      prevention: "Urgent medical attention and strict adherence to treatment plans. Aggressive diabetes management is critical."
    },
    {
      id: 5,
      title: "Proliferative Diabetic Retinopathy (PDR)", // Updated abbreviation
      description: "Growth of abnormal blood vessels and risk of vision loss.",
      details: "At this advanced stage, the growth factors released by the retina trigger the proliferation of new blood vessels (neovascularization). These new vessels are abnormal and fragile, growing on the surface of the retina and into the vitreous gel. They can leak blood into the vitreous (vitreous hemorrhage) and form scar tissue that may pull on the retina, potentially causing retinal detachment.",
      symptoms: "Significant vision loss, floating dark spots or streaks, blurred vision, impaired color vision, and potentially sudden vision loss if bleeding or retinal detachment occurs.",
      treatment: "Urgent intervention required. Treatments include pan-retinal photocoagulation (PRP) laser surgery, anti-VEGF injections, vitrectomy surgery for vitreous hemorrhage or tractional retinal detachment.",
      risks: "High risk of permanent vision loss or blindness if left untreated. Complications include vitreous hemorrhage, tractional retinal detachment, and neovascular glaucoma.",
      prevention: "Immediate specialist care is essential. Emergency treatment may be required to preserve vision."
    }
  ];

  const preventionTips = [
    "Schedule comprehensive eye exams at least annually, more frequently if recommended",
    "Maintain blood sugar levels within your target range (typically HbA1c below 7%)",
    "Keep blood pressure under control (aim for below 130/80 mmHg)",
    "Manage cholesterol levels through diet and medication if prescribed",
    "Follow a diabetic-friendly diet rich in fruits, vegetables, and omega-3 fatty acids",
    "Exercise regularly as recommended by your healthcare provider",
    "Avoid smoking and limit alcohol consumption",
    "Take diabetes medications as prescribed"
  ];

  const warningSignsToWatch = [
    "Sudden vision changes or vision loss",
    "Increasing number of floaters (tiny dark spots or strings floating in your vision)",
    "Blurred or patchy vision that doesn't clear",
    "Difficulty seeing at night or in dim light",
    "Colors appearing faded or washed out",
    "Empty or dark areas in your field of vision"
  ];
  // --- End of Data ---

  return (
    <section
      id="diabetic-retinopathy-info"
      className="mx-auto max-w-5xl px-4 py-24 text-white font-poppins bg-black"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Heading */}
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
        className="mb-16 text-5xl font-bold uppercase text-zinc-50 transition-all duration-300 ease-in-out transform hover:scale-105 text-center"
      >
        What is  Diabetic Retinopathy ?
      </motion.h1>

      {/* Information about Diabetic Retinopathy */}
      <div className="text-lg text-gray-300">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="p-6 border border-gray-800 rounded-lg mb-8 backdrop-filter backdrop-blur-sm bg-black bg-opacity-60 hover:bg-opacity-70 transition-all duration-300"
        >
          <p className="mb-6 hover:text-gray-200 transition-all duration-300 ease-in-out">
            Diabetic Retinopathy is a diabetes-related eye disease affecting the retina's blood vessels. It's a leading cause of vision impairment in working-age adults, often developing slowly due to high blood sugar damaging these delicate vessels.
          </p>
          <p className="hover:text-gray-200 transition-all duration-300 ease-in-out mb-6">
            This page explains the different stages of the condition. Our tool uses AI to analyze retinal images and suggest a potential severity level based on these stages. Early detection is key to managing DR and preventing severe vision loss.
          </p>

           {/* --- SUGGESTION 1: Add Call-to-Action / Link to Detection Tool --- */}
           <AnalyzeSection userId={userId} />
           {/* --- End Suggestion 1 --- */}

           {/* --- SUGGESTION 2: Add Disclaimer --- */}
           <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 p-4 bg-yellow-900 bg-opacity-30 border-l-4 border-yellow-500 rounded flex items-start"
           >
               <svg className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
               <div>
                 <h4 className="font-medium text-yellow-300">Important Disclaimer</h4>
                 <p className="text-gray-300 mt-1 text-base">
                   The severity assessment provided by our tool is for informational purposes only and uses AI analysis. It is **not** a substitute for a professional medical diagnosis. Always consult a qualified ophthalmologist or healthcare provider for accurate diagnosis, treatment, and management of diabetic retinopathy. Regular comprehensive eye exams remain essential.
                 </p>
               </div>
           </motion.div>
           {/* --- End Suggestion 2 --- */}


          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSymptomAlert(!showSymptomAlert)}
            className="mt-8 px-4 py-2 rounded-full text-sm font-medium border border-gray-600 hover:border-white inline-flex items-center group"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="group-hover:text-white transition-colors duration-300">Show Urgent Warning Signs</span>
          </motion.button>

          <AnimatePresence>
            {showSymptomAlert && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-red-900 bg-opacity-30 border-l-4 border-red-500 px-4 py-3 rounded" // Changed background for emphasis
              >
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-red-300">Urgent Warning Signs: Seek Immediate Care</h3>
                    <div className="mt-2 text-sm text-gray-300">
                      <ul className="list-disc pl-5 space-y-1">
                        {warningSignsToWatch.map((sign, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {sign}
                          </motion.li>
                        ))}
                      </ul>
                      <p className="mt-3 font-semibold">If you experience any of these symptoms, contact an eye care professional immediately.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subheading */}
        <motion.h2
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.75 }}
          className="text-3xl font-semibold text-zinc-50 mb-6 text-center"
        >
          Stages of Diabetic Retinopathy
        </motion.h2>

        {/* Interactive Stage Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {stages.map((stage) => (
            <motion.button
              key={stage.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 border ${
                activeStage === stage.id
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-gray-600 hover:border-white'
              }`}
              onClick={() => setActiveStage(stage.id === activeStage ? null : stage.id)}
            >
              {/* Stage {stage.id} */}
              {/* --- SUGGESTION 3: Use shorter stage titles on buttons --- */}
               {stage.title.split('(')[0].trim()} {/* Show only 'Mild Nonproliferative Retinopathy' etc. */}
            </motion.button>
          ))}
        </div>

        {/* Stage Details */}
        <AnimatePresence mode="wait">
          {activeStage ? (
            <motion.div
              key={`stage-${activeStage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-6 border border-gray-700 rounded-lg mb-8 bg-gradient-to-b from-gray-900 to-black"
            >
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-semibold mb-2 text-white border-b border-gray-700 pb-2"
              >
                {stages[activeStage - 1].title}
              </motion.h3>

              <p className="text-gray-300 mb-4 italic">
                {stages[activeStage - 1].description}
              </p>

              <div className="mb-6">
                 {/* --- SUGGESTION 4: Add Placeholder for Visual Clues --- */}
                 {/* Example for Mild NPDR (Stage 2) */}
                 {activeStage === 2 && (
                   <p className="text-sm text-gray-400 mb-4">
                     <span className="font-semibold text-gray-300">Visual Clues (in scans):</span> May show tiny red dots (microaneurysms).
                   </p>
                 )}
                 {/* Example for Moderate NPDR (Stage 3) */}
                 {activeStage === 3 && (
                   <p className="text-sm text-gray-400 mb-4">
                     <span className="font-semibold text-gray-300">Visual Clues (in scans):</span> More microaneurysms, possible small hemorrhages (blotches), hard exudates (yellow spots).
                   </p>
                 )}
                 {/* Example for Severe NPDR (Stage 4) */}
                 {activeStage === 4 && (
                   <p className="text-sm text-gray-400 mb-4">
                     <span className="font-semibold text-gray-300">Visual Clues (in scans):</span> Significant hemorrhages/microaneurysms in multiple quadrants, venous beading (irregular vessel width), cotton wool spots (white patches).
                   </p>
                 )}
                 {/* Example for PDR (Stage 5) */}
                 {activeStage === 5 && (
                   <p className="text-sm text-gray-400 mb-4">
                     <span className="font-semibold text-gray-300">Visual Clues (in scans):</span> Presence of neovascularization (new, abnormal blood vessels), possible vitreous/pre-retinal hemorrhage.
                   </p>
                 )}
                 {/* --- End Suggestion 4 --- */}

                <p className="text-gray-300">{stages[activeStage - 1].details}</p>
              </div>

              {/* Tabbed Information */}
              <div className="mt-6">
                <div className="flex border-b border-gray-700 mb-4 overflow-x-auto">
                  {['symptoms', 'treatment', 'risks', 'prevention'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 text-sm font-medium transition-all duration-300 capitalize whitespace-nowrap ${ // Added whitespace-nowrap
                        activeTab === tab
                          ? 'border-b-2 border-white text-white'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-gray-900 bg-opacity-40 rounded min-h-[100px]" // Added min-height
                  >
                    <h4 className="text-lg font-medium text-white mb-2 capitalize">{activeTab}</h4>
                    <p className="text-gray-300">
                      {stages[activeStage - 1][activeTab]}
                    </p>

                    {/* --- SUGGESTION 5: Add Suggested Next Steps based on Stage --- */}
                    {activeTab === 'treatment' && ( // Show only in treatment tab for relevance
                       <div className="mt-4 pt-3 border-t border-gray-700">
                          <p className="text-sm font-semibold text-gray-300 mb-1">Suggested Next Steps (General Guidance):</p>
                          {activeStage === 1 && <p className="text-sm text-gray-400">Continue regular diabetes management and annual eye exams.</p>}
                          {activeStage === 2 && <p className="text-sm text-gray-400">Focus on optimizing blood sugar/pressure control. Discuss monitoring frequency (e.g., 6-12 months) with your eye doctor.</p>}
                          {activeStage === 3 && <p className="text-sm text-gray-400">Closer monitoring needed (e.g., 4-6 months). Discuss potential need for treatment (like anti-VEGF) if macular edema develops.</p>}
                          {activeStage === 4 && <p className="text-sm text-yellow-400">Urgent consultation with an eye specialist recommended. Discuss preventative treatments (laser/anti-VEGF) to reduce progression risk.</p>}
                          {activeStage === 5 && <p className="text-sm text-red-400">Requires immediate evaluation and treatment by a retinal specialist to prevent severe vision loss.</p>}
                       </div>
                    )}
                    {/* --- End Suggestion 5 --- */}

                  </motion.div>
                </AnimatePresence>
              </div>

              {activeStage === 5 && ( // Keep urgent warning for PDR
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-6 p-4 bg-red-800 bg-opacity-50 border-l-4 border-red-500 rounded flex items-start"
                >
                  <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-medium text-white">Urgent Medical Attention Required</p>
                    <p className="text-gray-300 mt-1">Proliferative DR is a serious condition requiring immediate specialist care to preserve vision. Do not delay seeking help.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : ( // View when no stage is selected
            <motion.div
              key="stage-list-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center p-6 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50"
            >
              <p className="text-lg text-gray-300 mb-4">Select a stage above or from the timeline below to learn more about its characteristics, symptoms, and general management approaches.</p>
              <p className="text-sm text-gray-400">Understanding these stages can help you interpret the results from our retinal image analysis tool.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="my-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white text-center">Disease Progression Timeline</h3>
          <div className="relative px-2"> {/* Added padding to prevent overlap */}
            {/* Timeline Line */}
            <div className="absolute h-1 bg-gray-700 top-5 left-2 right-2 rounded-full"></div>

            {/* Timeline Points */}
            <div className="flex justify-between items-start relative"> {/* Changed items-center to items-start */}
              {stages.map((stage) => (
                <motion.div
                  key={stage.id}
                  whileHover={{ scale: 1.1 }} // Slightly increased hover scale
                  onClick={() => setActiveStage(stage.id)}
                  className="flex flex-col items-center relative cursor-pointer group pt-0" // Removed top padding from here
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 border-2 ${ // Added border
                    activeStage === stage.id
                      ? 'bg-white border-white'
                      : 'bg-gray-800 border-gray-600 group-hover:bg-gray-700 group-hover:border-gray-500'
                  }`}>
                    <span className={`font-bold ${activeStage === stage.id ? 'text-black' : 'text-white'}`}>{stage.id}</span>
                  </div>
                  <p className="text-xs md:text-sm mt-2 text-center max-w-[100px] md:max-w-[120px] opacity-80 group-hover:opacity-100 transition-opacity duration-300 leading-tight"> {/* Added leading-tight */}
                    {stage.title.replace("Diabetic Retinopathy", "DR").replace("Nonproliferative", "NP").split('(')[0].trim()} {/* Shortened title */}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Prevention Section Toggle */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all duration-300 flex items-center"
          >
            {showMoreInfo ? 'Hide General Prevention Tips' : 'Show General Prevention Tips'}
            <svg
              className={`ml-2 w-4 h-4 transition-transform duration-300 ${showMoreInfo ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>

        {/* Prevention Tips Section */}
        <AnimatePresence>
          {showMoreInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="border border-gray-700 rounded-lg p-6 mb-8 bg-gradient-to-b from-gray-900 to-black overflow-hidden" // Added overflow-hidden
            >
              <h3 className="text-2xl font-semibold mb-6 text-white text-center">General Prevention & Management Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {preventionTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-start bg-black bg-opacity-40 p-4 rounded-lg border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-white/5"
                  >
                    <div className="mr-3 bg-white text-black rounded-full p-1 flex-shrink-0 mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">{tip}</span>
                  </motion.div>
                ))}
              </div>
              {/* PATIENT EXPERIENCE SECTION REMOVED HERE */}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 text-lg text-gray-300 border-l-4 border-blue-500 pl-4 italic" // Changed border color
        >
          Remember, proactive diabetes management and regular professional eye screenings are the most effective ways to protect your vision from Diabetic Retinopathy.
        </motion.p>
      </div>

       {/* --- SUGGESTION 6: Add Further Resources Section --- */}
       <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">Learn More</h2>
          <div className="grid md:grid-cols-2 gap-4 text-center">
             {[
               { name: "National Eye Institute (NEI)", url: "https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/diabetic-retinopathy" },
               { name: "American Diabetes Association (ADA)", url: "https://diabetes.org/diabetes/eye-health" },
               { name: "Prevent Blindness", url: "https://preventblindness.org/diabetic-retinopathy/" },
               { name: "World Health Organization (WHO) - Diabetes", url: "https://www.who.int/news-room/fact-sheets/detail/diabetes" }
             ].map((resource, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1, duration: 0.5 }}
                 whileHover={{ scale: 1.03, C: '#ffffff'}}
                 className="bg-white/5 p-4 rounded-lg border border-gray-800 hover:border-gray-500 transition-all duration-300"
               >
                 <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-medium">
                   {resource.name}
                   <svg className="w-4 h-4 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                 </a>
               </motion.div>
             ))}
          </div>
       </motion.div>
       {/* --- End Suggestion 6 --- */}


      {/* QUESTIONS TO ASK DOCTOR SECTION REMOVED HERE */}

      {/* Footer with updated disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500"
      >
        <p>Information provided is for educational purposes and to supplement our AI analysis tool. It does not constitute medical advice.</p>
        <p>Always consult with qualified healthcare professionals for diagnosis and treatment.</p>
        {/* Keep the date dynamic or manage it appropriately */}
        <p className="mt-2">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </motion.div>
    </section>
  );
};

export default DiabeticRetinopathyInfo;


