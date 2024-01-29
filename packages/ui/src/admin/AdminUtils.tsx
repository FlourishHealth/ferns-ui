export type OpenApiSpec = any;

// OpenAPIAdmin is the overarching component that handles displaying a list of models, or a specific
// model instance.
export type OpenAPIAdminNavigate = (params: {
  model?: string;
  id?: string;
  page?: number;
  sort?: string;
}) => void;
