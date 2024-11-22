import React, { useState } from 'react';
import { X, Folder, Save } from 'lucide-react';
import { platformConfigs } from '../config/platformConfigs';
import { validateWorkflowForm } from '../utils/validators';

const WorkflowModal = ({ onClose, onSave, workflow = null }) => {
  const [formData, setFormData] = useState(
    workflow || {
      name: '',
      platform: '',
      interval: 60,
      folders: [],
      webhook: '',
      apiConfig: {}
    }
  );
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateWorkflowForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(formData);
    } catch (error) {
      setErrors({ submit: '保存失败，请重试' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleApiConfigChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      apiConfig: {
        ...prev.apiConfig,
        [key]: value
      }
    }));
    if (errors[`apiConfig.${key}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`apiConfig.${key}`];
        return newErrors;
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {workflow ? '编辑工作流' : '创建新工作流'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">
              工作流名称
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              className={`input ${errors.name ? 'border-red-300' : ''}`}
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="给工作流起个名字"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="label">
              选择平台
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              className={`input ${errors.platform ? 'border-red-300' : ''}`}
              value={formData.platform}
              onChange={(e) => {
                handleFieldChange('platform', e.target.value);
                handleFieldChange('apiConfig', {});
              }}
            >
              <option value="">选择平台</option>
              {Object.entries(platformConfigs).map(([id, platform]) => (
                <option key={id} value={id}>
                  {platform.icon} {platform.name}
                </option>
              ))}
            </select>
            {errors.platform && (
              <p className="text-sm text-red-500 mt-1">{errors.platform}</p>
            )}
          </div>

          {formData.platform && (
            <div className="space-y-4">
              {platformConfigs[formData.platform].fields.map((field) => (
                <div key={field.key}>
                  <label className="label">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={field.type}
                    className={`input ${
                      errors[`apiConfig.${field.key}`] ? 'border-red-300' : ''
                    }`}
                    value={formData.apiConfig[field.key] || ''}
                    onChange={(e) => handleApiConfigChange(field.key, e.target.value)}
                  />
                  {errors[`apiConfig.${field.key}`] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[`apiConfig.${field.key}`]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="label">
              发送间隔（分钟）
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              className={`input ${errors.interval ? 'border-red-300' : ''}`}
              value={formData.interval}
              onChange={(e) => handleFieldChange('interval', parseInt(e.target.value))}
              min="1"
            />
            {errors.interval && (
              <p className="text-sm text-red-500 mt-1">{errors.interval}</p>
            )}
          </div>

          <div>
            <label className="label">选择文件夹</label>
            <button
              type="button"
              className="w-full px-3 py-2 border rounded text-left bg-gray-50 hover:bg-gray-100 flex items-center"
              onClick={() => {/* TODO: Implement folder selection */}}
            >
              <Folder className="w-4 h-4 mr-2" />
              选择 Dropbox 文件夹
            </button>
          </div>

          <div>
            <label className="label">Webhook URL（可选）</label>
            <input
              type="url"
              className={`input ${errors.webhook ? 'border-red-300' : ''}`}
              value={formData.webhook}
              onChange={(e) => handleFieldChange('webhook', e.target.value)}
              placeholder="http://example.com/webhook"
            />
            {errors.webhook && (
              <p className="text-sm text-red-500 mt-1">{errors.webhook}</p>
            )}
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="btn btn-secondary"
              disabled={isSaving}
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="btn btn-primary flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  保存中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {workflow ? '保存修改' : '创建工作流'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowModal;