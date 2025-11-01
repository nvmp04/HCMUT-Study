import React, { useState } from 'react';
import { Calendar, Sparkles, Clock, Target, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchAPI } from '../../../../utils/fetchAPI';
import {LoadingModal} from '../../../../components/LoadingModal'
import { TutorList } from './TutorList';

function Roadmap(){
  const url = 'https://hcmut-study-backend.onrender.com/student/getroadmap';
  const {data, isLoading} = useQuery({
    queryKey: ['roadmap'], 
    queryFn: async()=> fetchAPI(url, 'GET', null, true)
  })
  const [expandedStage, setExpandedStage] = useState(null);
  if(isLoading) return <LoadingModal/>

  return (
    <div className="min-h-screen to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {!data.roadmap ? (
          // Empty State
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 border border-gray-200">
                <Sparkles className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Chưa có lộ trình học tập</h2>
              <p className="text-gray-600 mb-6">
                Bắt đầu hành trình học tập của bạn bằng cách tạo lộ trình được cá nhân hóa bởi AI
              </p>
            </div>
          </div>
        ) : (
          // Current Plan Display
          <div className="space-y-6">
            {/* Header with Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.roadmap.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span><strong>Thời gian hoàn thành lộ trình: </strong> {data.roadmap.overview.totalDuration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span><strong>Số giờ học trong tuần: </strong> {data.roadmap.overview.hoursPerWeek}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Overview */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Tổng quan Lộ trình
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                  {data.roadmap.overallTimeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
              {/* Learning Stages */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">Các Giai Đoạn Học Tập</h2>
                </div>

                {data.roadmap.stages.map((stage) => (
                  <div
                    key={stage.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
                  >
                    {/* Stage Header */}
                    <div className="p-6 bg-white">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                              <span className="text-white font-bold text-lg">{stage.id}</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{stage.name}</h3>
                              <p className="text-sm text-gray-600">{stage.duration}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-semibold px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          {expandedStage === stage.id ? 'Thu gọn' : 'Chi tiết'}
                        </button>
                      </div>

                      {/* Objectives */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2"> Mục tiêu:</h4>
                        {stage.objectives.map((obj, i) => (
                          <div key={i} className="flex items-start bg-green-100 gap-2 text-sm text-gray-700 rounded-lg p-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedStage === stage.id && (
                      <div className="p-6 space-y-6 border-t border-gray-100">
                        {/* Topics */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            Nội dung học:
                          </h4>
                          <ul className="space-y-2">
                            {stage.topics.map((topic, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            Tài liệu:
                          </h4>
                          <ul className="space-y-2">
                            {stage.resources?.map((resource, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-blue-600">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                {resource}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Project */}
                        <div className="bg-purple-100 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            Dự án thực hành: {stage.project.title}
                          </h4>
                          <ul className="space-y-1.5 mt-2">
                              <li className="flex items-start gap-2 text-sm text-gray-700">
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                {stage.project}
                              </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Sidebar - Tips & All Tutors */}
              <div className="space-y-4">
                {/* All Tutors */}
                <TutorList tutorsId={data.roadmap.tutors}/>
                {/* Tips */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Lời Khuyên</h2>
                  </div>
                  <ul className="space-y-3">
                    {data.roadmap.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;