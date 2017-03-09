module.exports = function(grunt) {

  grunt.initConfig({

    accessibility: {
      options: {
        // Levels are WCAG2A, WCAG2AA, WCAG2AAA, and Section508
        accessibilityLevel: "WCAG2AAA",
        browser: true,
        // reportType: "json",
        // reportLocation: "reports",
        reportLevels: {
          notice: false,
          warning: false,
          error: true
        },
        ignore: [
          'WCAG2AAA.Principle1.Guideline1_4.1_4_6.G17'
        ]
      },
      test: {
        options: {
          urls: [
            "http://localhost:4000",
            "http://localhost:4000/automated-accessibility-testing",
            "http://localhost:4000/how-to-make-a-skip-link",
            "http://localhost:4000/how-to-contribute-to-levelup",
            "http://localhost:4000/create-a-jekyll-blog",
            "http://localhost:4000/jackiejohnston"
          ]
        }
      }
    }

  });


  grunt.loadNpmTasks("grunt-accessibility");

  grunt.registerTask("default", ["accessibility"]); 

};