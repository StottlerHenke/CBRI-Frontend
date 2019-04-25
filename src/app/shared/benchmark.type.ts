enum Benchmarks {
  CommentDensity = 'useful_comment_density',
  PropagationCost = 'propagation_cost',
  CoreSize = 'core_size',
  OverlyComplexFiles = 'percent_files_overly_complex',
}

export class Benchmark {
  url: string;
  repository: string;
  measurement_name: Benchmarks;
  percentile_25: number;
  percentile_50: number;
  upper_threshold: number;
  num_cases: number;
}
