export class Measurement {
  url: string;
  repository: string;
  date: string;
  architecture_type: string;
  propagation_cost: number;
  useful_lines_of_code: number;
  num_classes: number;
  num_files: number;
  num_files_in_core: number;
  percent_files_overly_complex: number;
  useful_comment_density: number;
  useful_lines_of_comments: number;
  num_files_overly_complex: number;
  core_size: number;
  duplicate_uloc: number;
  percent_duplicate_uloc: number;
  is_baseline: boolean;
}
