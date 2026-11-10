export type LoginFormProps = {
  isSubmitting?: boolean;
  error?: string | null;
  onSubmit: (pseudo: string) => void;
};
