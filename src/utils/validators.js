export const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  export const validateWorkflowForm = (formData) => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = '工作流名称为必填项';
    }
  
    if (!formData.platform) {
      errors.platform = '请选择平台';
    }
  
    if (!formData.interval || formData.interval < 1) {
      errors.interval = '发送间隔必须大于0';
    }
  
    if (formData.webhook && !isValidUrl(formData.webhook)) {
      errors.webhook = '请输入有效的URL';
    }
  
    return errors;
  };
  
  export const validateDropboxConfig = (config) => {
    const errors = {};
    
    ['apiKey', 'apiSecret', 'accessToken', 'refreshToken'].forEach(field => {
      if (!config[field]) {
        errors[field] = `${field} 为必填项`;
      }
    });
  
    return errors;
  };
  
  export const formatDate = (date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };