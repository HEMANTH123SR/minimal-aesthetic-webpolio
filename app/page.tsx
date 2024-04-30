"use client";
import { GraduationCap } from "lucide-react";
import { linkedinData } from "@/app/linkedin-data";
import { Poppins, Rammetto_One } from "next/font/google";
import { useState } from "react";
const poppins = Poppins({ subsets: ["latin"], weight: "300" });
const poppinsBold = Poppins({ subsets: ["latin"], weight: "500" });
const poppinsExtraBold = Poppins({ subsets: ["latin"], weight: "600" });
const rammetto_one = Rammetto_One({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);
  const [showAllCertificate, setShowAllCertificate] = useState<boolean>(false);
  const [showAllCourses, setShowAllCourese] = useState<boolean>(false);
  const user = linkedinData[0];
  return (
    <main
      className={`h-full w-full flex  flex-col space-y-6 bg-white pt-7 pl-7 pr-5 md:pt-16 md:pl-44 text-[#333333] ${poppins.className} `}
    >
      <div className="flex space-x-4 sm:space-x-8  items-center">
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            className="rounded-2xl w-20 h-20 sm:w-28 sm:h-28  "
          />
        )}
        <div className={`flex flex-col space-y-1  ${rammetto_one.className}`}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl">
            {user.firstName.toUpperCase()}
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl">
            {user.lastName.toUpperCase()}
          </h1>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <p className="w-full sm:w-2/3 font-semibold border-l-4 border-[#333333] pl-2">
          {user.headline}
        </p>

        <p className="w-full sm:w-2/3 font-semibold text-sm">{user.summary}</p>
      </div>

      {user.position && (
        <div className="flex flex-col space-y-5 pt-6">
          <h2 className={` text-2xl  pl-2  ${rammetto_one.className}`}>
            Postions
          </h2>

          <div className="flex flex-row flex-wrap gap-5">
            {user.position.map((data, index) => {
              return (
                <div
                  key={`${data.companyName + data.title}`}
                  className={`w-52 h-auto  rounded-xl flex flex-col items-center space-y-1 border p-4 cursor-pointer `}
                >
                  <img
                    src={data.companyLogo}
                    className="rounded-full w-20 h-20  "
                  />
                  <h3 className={` font-semibold ${poppinsBold.className}`}>
                    {data.companyName.slice(0, 10)}
                    {data.companyName.length > 10 ? `..` : ``}
                  </h3>
                  <span className={`text-xs`}>
                    {data.companyIndustry.slice(0, 23)}
                    {data.companyIndustry.length > 25 ? ".." : ""}
                  </span>
                  <h2
                    className={`sm:hidden pt-8 px-2 w-full h-full   ${poppinsBold.className}`}
                  >
                    {data.title}
                  </h2>
                  <h2
                    className={`hidden sm:block pt-8 px-2 w-full h-full  ${poppinsExtraBold.className}`}
                  >
                    {data.title}
                  </h2>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {user.educations && (
        <div className="flex flex-col space-y-5 pt-6">
          <h2 className={`text-2xl pl-2 ${rammetto_one.className}`}>
            Education
          </h2>
          <div className="flex flex-col space-y-6">
            {user.educations.map((data) => {
              return (
                <div
                  key={data.schoolId + data.degree}
                  className="flex space-x-3  justify-start items-center"
                >
                  <GraduationCap className="min-h-5 min-w-5 sm:min-h-8 sm:min-w-8 text-[#333333]" />
                  <div className="flex flex-col justify-center items-start ">
                    <h3 className={`${poppinsBold.className} `}>
                      {data.schoolName}
                    </h3>
                    <h4 className="font-medium text-sm text-wrap">
                      {data.degree}
                      {data.fieldOfStudy && data.degree
                        ? `, ${data.fieldOfStudy}`
                        : `${data.fieldOfStudy ? `${data.fieldOfStudy}` : ""}`}
                    </h4>
                    <span className="text-slate-500 text-sm">
                      {data.start.year > 0 ? data.start.year : ""}
                      {data.end.year > 0 ? `- ${data.end.year}` : ""}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {user.certifications && (
        <div className="flex flex-col space-y-5 pt-6">
          <h2 className={`text-2xl pl-2 ${rammetto_one.className}`}>
            Certifications
          </h2>
          <div className="flex flex-col space-y-8">
            {user.certifications
              .slice(0, showAllCertificate ? user.certifications.length : 4)
              .map((data) => (
                <div
                  key={data.name}
                  className="flex space-x-3 justify-start items-center"
                >
                  <img
                    className="w-16 h-16 rounded-md"
                    src={data.company.logo}
                  />
                  <div className="flex flex-col justify-center items-start">
                    <h3 className={`${poppinsBold.className}`}>{data.name}</h3>
                    <h4 className=" text-sm">{data.authority}</h4>
                    <span className="text-slate-500 text-xs">
                      {data.start.day}/{data.start.month}/{data.start.year}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          {user.certifications.length > 4 && (
            <span
              onClick={() => setShowAllCertificate((prev) => !prev)}
              className="underline cursor-pointer font-semibold"
            >
              {showAllCertificate ? "Show Less" : "Show More"}
            </span>
          )}
        </div>
      )}

      {user.courses && (
        <div className="flex flex-col space-y-5 pt-6">
          <h2 className={`text-2xl pl-2 ${rammetto_one.className}`}>Courses</h2>

          {user.courses
            .slice(0, showAllCourses ? user.courses.length : 4)
            .map((course) => (
              <div
                className="flex justify-start items-center space-x-3"
                key={course.name}
              >
                <div className="min-h-2 min-w-2 sm:min-h-3 sm:min-w-3 bg-[#333333] rounded-full"></div>
                <h3
                  className={`${poppinsBold.className} text-sm sm:text-base `}
                >
                  {course.name}
                </h3>
              </div>
            ))}
          {user.courses.length > 4 && (
            <span
              onClick={() => setShowAllCourese((prev) => !prev)}
              className="underline cursor-pointer font-semibold"
            >
              {showAllCourses ? "Show Less" : "Show More"}
            </span>
          )}
        </div>
      )}

      {user.skills && (
        <div className="flex flex-col space-y-5 pt-6">
          <h2 className={`text-2xl pl-2 ${rammetto_one.className}`}>Skills</h2>
          <div className="flex flex-col space-y-4">
            {user.skills
              .slice(0, showAllSkills ? user.skills.length : 4)
              .map((skill) => (
                <div
                  key={skill.name}
                  className="flex justify-start space-x-2.5 items-center"
                >
                  <div className="min-h-2 min-w-2 sm:min-h-3 sm:min-w-3 bg-[#333333] rounded-full"></div>
                  <h4
                    className={`${poppinsBold.className} text-sm sm:text-base`}
                  >
                    {skill.name.toUpperCase()}
                  </h4>
                </div>
              ))}
            {user.skills.length > 4 && (
              <span
                onClick={() => setShowAllSkills((prev) => !prev)}
                className="underline cursor-pointer font-semibold"
              >
                {showAllSkills ? "Show Less" : "Show More"}
              </span>
            )}
          </div>
        </div>
      )}

      {user.languages && (
        <div className="flex flex-col space-y-5 pt-6">
          <h2 className={`text-2xl pl-2 ${rammetto_one.className}`}>
            Languages
          </h2>
          <div
            className={`${poppinsBold.className}  flex flex-wrap  space-x-3.5 sm:space-x-5`}
          >
            {user.languages.map((data) => (
              <span key={data.name}>{data.name}</span>
            ))}
          </div>
        </div>
      )}

      <div
        className="flex flex-col  border-t  w-full sm:w-2/3 pb-36 pt-6 justify-start items-start space-y-3"
        style={{ marginTop: "60px" }}
      >
        <a
          href={`https://www.linkedin.com/in/${user.username}`}
          className="font-semibold underline"
        >
          Linkedin Profile
        </a>
        <h5 className="font-semibold">{user.geo.full}</h5>
        <h5 className="font-semibold">
          {`created with the help of `}{" "}
          <a href="https://www.webpolio.online/" className="underline">
            webpolio
          </a>{" "}
        </h5>
      </div>
    </main>
  );
}
