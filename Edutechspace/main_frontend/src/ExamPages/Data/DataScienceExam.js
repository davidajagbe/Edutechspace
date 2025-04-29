// dataScienceExam.js

export const dataScienceExam = {
  title: "Data Science Certification Exam",
  instructions: "This quiz tests your understanding of core data science principles including data analysis, statistics, Python, and machine learning. Complete 30 questions within 15 minutes. A minimum of 18 correct answers is required to pass.",
  passingScore: 18,
  timeLimit: 900, // 15 minutes
  onSuccessLink: "https://wa.me/2348012345678",
  questionsData: [
    {
      question: "What is the main purpose of data cleaning?",
      options: ["To fix broken computers", "To correct or remove inaccurate records", "To clean the office", "To collect data"],
      answer: "To correct or remove inaccurate records",
    },
    {
      question: "Which library is commonly used in Python for data manipulation?",
      options: ["NumPy", "Pandas", "Matplotlib", "TensorFlow"],
      answer: "Pandas",
    },
    {
      question: "What does CSV stand for?",
      options: ["Comma Separated Values", "Common Standard Values", "Continuous Structured Variables", "Central Schema Version"],
      answer: "Comma Separated Values",
    },
    {
      question: "Which function is used to get basic statistics in pandas?",
      options: ["summary()", "stats()", "describe()", "overview()"],
      answer: "describe()",
    },
    {
      question: "Which plot is best for visualizing the distribution of a dataset?",
      options: ["Bar Chart", "Histogram", "Pie Chart", "Line Chart"],
      answer: "Histogram",
    },
    {
      question: "What is the output of 3 ** 2 in Python?",
      options: ["6", "9", "8", "5"],
      answer: "9",
    },
    {
      question: "Which method is used to group data in pandas?",
      options: ["aggregate()", "groupby()", "split()", "combine()"],
      answer: "groupby()",
    },
    {
      question: "What is the default axis for sum() in pandas?",
      options: ["0 (columns)", "1 (rows)", "None", "2 (depth)"],
      answer: "0 (columns)",
    },
    {
      question: "Which of the following is not a supervised learning algorithm?",
      options: ["Linear Regression", "Decision Trees", "K-Means Clustering", "Logistic Regression"],
      answer: "K-Means Clustering",
    },
    {
      question: "What does overfitting mean in machine learning?",
      options: ["Model is too simple", "Model fits noise in training data", "Model doesn’t fit training data", "None of the above"],
      answer: "Model fits noise in training data",
    },
    {
      question: "Which Python library is commonly used for machine learning?",
      options: ["Scikit-learn", "Flask", "BeautifulSoup", "Selenium"],
      answer: "Scikit-learn",
    },
    {
      question: "What is the purpose of the train_test_split function?",
      options: ["To split code into modules", "To divide data into training and testing sets", "To break text data", "None of the above"],
      answer: "To divide data into training and testing sets",
    },
    {
      question: "Which is used to handle missing data in pandas?",
      options: ["fillna()", "dropna()", "Both", "None"],
      answer: "Both",
    },
    {
      question: "Which metric is used for classification accuracy?",
      options: ["R-squared", "Accuracy Score", "MSE", "RMSE"],
      answer: "Accuracy Score",
    },
    {
      question: "Which function helps identify correlation in pandas?",
      options: ["relation()", "associate()", "corr()", "link()"],
      answer: "corr()",
    },
    {
      question: "Which Python function is used to create arrays?",
      options: ["array()", "np.array()", "arr()", "make_array()"],
      answer: "np.array()",
    },
    {
      question: "Which statement correctly imports pandas?",
      options: ["import pandas as pd", "import pd as pandas", "import panda", "include pandas"],
      answer: "import pandas as pd",
    },
    {
      question: "Which method removes duplicates in a pandas DataFrame?",
      options: ["remove()", "drop_duplicates()", "unique()", "clear_duplicates()"],
      answer: "drop_duplicates()",
    },
    {
      question: "Which is used to save a DataFrame as a CSV file?",
      options: ["to_csv()", "save()", "write_csv()", "export_csv()"],
      answer: "to_csv()",
    },
    {
      question: "Which type of variable is 'Age'?", 
      options: ["Categorical", "Numerical", "Boolean", "Text"],
      answer: "Numerical"
    },
    {
      question: "What is the purpose of a confusion matrix?",
      options: ["To confuse the algorithm", "To display true/false positive/negatives", "To identify clusters", "To improve accuracy"],
      answer: "To display true/false positive/negatives",
    },
    {
      question: "Which plot shows correlation between two variables?",
      options: ["Histogram", "Scatter plot", "Pie chart", "Box plot"],
      answer: "Scatter plot",
    },
    {
      question: "Which is an example of classification problem?",
      options: ["Predicting house prices", "Predicting if email is spam", "Predicting temperature", "Predicting sales"],
      answer: "Predicting if email is spam",
    },
    {
      question: "Which library provides support for large, multi-dimensional arrays?",
      options: ["NumPy", "pandas", "matplotlib", "seaborn"],
      answer: "NumPy",
    },
    {
      question: "What does NaN stand for?",
      options: ["Name and Number", "Not a Number", "Numeric Array Number", "No assigned name"],
      answer: "Not a Number",
    },
    {
      question: "Which method gives summary statistics for numeric columns?",
      options: ["stats()", "summary()", "describe()", "info()"],
      answer: "describe()",
    },
    {
      question: "Which method gives DataFrame shape?",
      options: ["len(df)", "df.size", "df.shape", "df.count()"],
      answer: "df.shape",
    },
    {
      question: "Which function in seaborn is used to show a heatmap of correlation?",
      options: ["heatmap()", "corrplot()", "hotmap()", "mapheat()"],
      answer: "heatmap()",
    },
    {
      question: "Which model is best for linear relationship prediction?",
      options: ["Decision Tree", "Random Forest", "Linear Regression", "SVM"],
      answer: "Linear Regression",
    },
    {
      question: "What does .head() do in pandas?",
      options: ["Shows first few rows", "Deletes first row", "Prints entire data", "Renames column"],
      answer: "Shows first few rows",
    },
    {
      question: "What does the dropna() function do?",
      options: ["Deletes NaN values", "Drops entire DataFrame", "Sorts rows", "Deletes column names"],
      answer: "Deletes NaN values"
    }
  ]
};
