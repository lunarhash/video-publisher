import React, { useState } from 'react';
import { Edit2, PlayCircle, PauseCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { platformConfigs } from '../config/platformConfigs';
import { formatDate } from '../utils/validators';

const WorkflowCard = ({ workflow, onEdit, onSelect, isSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className={`bg-white rounded-lg shadow ${isExpanded ? 'col-span-full' : ''}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(workflow.id)}
              className="w-4 h-4"
            />
            <span>{platformConfigs[workflow.platform].icon}</span>
            <span className="font-medium">{workflow.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(workflow);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isRunning ? (
                <PauseCircle className="w-4 h-4" />
              ) : (
                <PlayCircle className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">成功发送</div>
                <div className="text-xl font-bold text-green-600">12</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">发送失败</div>
                <div className="text-xl font-bold text-red-600">2</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">等待发送</div>
                <div className="text-xl font-bold text-blue-600">3</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">发送日志</h3>
              <div className="space-y-2">
                {[
                  { id: 1, status: 'success', video: 'video1.mp4', time: new Date() },
                  { id: 2, status: 'error', video: 'video2.mp4', time: new Date() }
                ].map(log => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      {log.status === 'success' ? '✅' : '❌'}
                      <span>{log.video}</span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatDate(log.time)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">配置信息</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">发送间隔：</span>
                  <span>{workflow.interval} 分钟</span>
                </div>
                <div>
                  <span className="text-gray-500">状态：</span>
                  <span className={isRunning ? 'text-green-500' : 'text-gray-500'}>
                    {isRunning ? '运行中' : '已暂停'}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500">Webhook：</span>
                  <span className="truncate block">
                    {workflow.webhook || '未设置'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowCard;