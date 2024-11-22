import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import WorkflowCard from './WorkflowCard';
import WorkflowModal from './WorkflowModal';
import SettingsView from './SettingsView';
import { Settings, Video, PlusCircle, Trash2, PlayCircle, PauseCircle } from 'lucide-react';

const VideoPublisher = () => {
  // State management
  const [activeTab, setActiveTab] = useState('workflows');
  const [workflows, setWorkflows] = useLocalStorage('workflows', []);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [selectedWorkflows, setSelectedWorkflows] = useState([]);
  const [dropboxConfig, setDropboxConfig] = useLocalStorage('dropboxConfig', {
    apiKey: '',
    apiSecret: '',
    accessToken: '',
    refreshToken: ''
  });

  // Batch operations
  const handleBatchDelete = () => {
    if (window.confirm(`确定要删除选中的 ${selectedWorkflows.length} 个工作流吗？`)) {
      setWorkflows(workflows.filter(w => !selectedWorkflows.includes(w.id)));
      setSelectedWorkflows([]);
    }
  };

  const handleBatchToggle = (action) => {
    setWorkflows(workflows.map(w => {
      if (selectedWorkflows.includes(w.id)) {
        return { ...w, status: action };
      }
      return w;
    }));
  };

  const handleSaveWorkflow = (workflowData) => {
    if (editingWorkflow) {
      setWorkflows(workflows.map(w => 
        w.id === editingWorkflow.id ? { ...workflowData, id: editingWorkflow.id } : w
      ));
    } else {
      setWorkflows([...workflows, { ...workflowData, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingWorkflow(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">视频发布系统</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className={`btn ${activeTab === 'workflows' ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveTab('workflows')}
              >
                <Video className="w-4 h-4 mr-2 inline-block" />
                工作流
              </button>
              <button
                className={`btn ${activeTab === 'settings' ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-4 h-4 mr-2 inline-block" />
                设置
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'workflows' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">工作流管理</h1>
              <div className="flex items-center gap-2">
                {selectedWorkflows.length > 0 && (
                  <>
                    <button
                      onClick={() => handleBatchToggle('pause')}
                      className="btn btn-secondary"
                    >
                      <PauseCircle className="w-4 h-4 mr-2 inline-block" />
                      批量暂停
                    </button>
                    <button
                      onClick={() => handleBatchToggle('start')}
                      className="btn btn-secondary"
                    >
                      <PlayCircle className="w-4 h-4 mr-2 inline-block" />
                      批量启动
                    </button>
                    <button
                      onClick={handleBatchDelete}
                      className="btn btn-secondary text-red-500"
                    >
                      <Trash2 className="w-4 h-4 mr-2 inline-block" />
                      批量删除
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary"
                >
                  <PlusCircle className="w-4 h-4 mr-2 inline-block" />
                  新建工作流
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflows.map(workflow => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onEdit={() => {
                    setEditingWorkflow(workflow);
                    setShowModal(true);
                  }}
                  onSelect={(id) => {
                    setSelectedWorkflows(prev => 
                      prev.includes(id) 
                        ? prev.filter(wId => wId !== id)
                        : [...prev, id]
                    );
                  }}
                  isSelected={selectedWorkflows.includes(workflow.id)}
                />
              ))}

              {workflows.length === 0 && (
                <div className="col-span-full text-center py-12 bg-white rounded-lg">
                  还没有工作流。点击"新建工作流"开始创建。
                </div>
              )}
            </div>

            {showModal && (
              <WorkflowModal
                workflow={editingWorkflow}
                onClose={() => {
                  setShowModal(false);
                  setEditingWorkflow(null);
                }}
                onSave={handleSaveWorkflow}
              />
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-6">系统设置</h1>
            <SettingsView
              dropboxConfig={dropboxConfig}
              setDropboxConfig={setDropboxConfig}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoPublisher;