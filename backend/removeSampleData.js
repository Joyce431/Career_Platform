const { FirebaseService, collections } = require('./services/FirebaseService');

const removeSampleData = async () => {
  try {
    console.log('Removing sample data from Firebase...');

    // Remove sample institution
    const institutions = await FirebaseService.query(collections.INSTITUTIONS, 'name', '==', 'University of Technology');
    if (institutions.length > 0) {
      for (const institution of institutions) {
        await FirebaseService.delete(collections.INSTITUTIONS, institution.id);
        console.log(`Removed sample institution: ${institution.name}`);
      }
    } else {
      console.log('No sample institution found.');
    }

    // Remove sample company
    const companies = await FirebaseService.query(collections.COMPANIES, 'name', '==', 'Tech Solutions Ltd');
    if (companies.length > 0) {
      for (const company of companies) {
        await FirebaseService.delete(collections.COMPANIES, company.id);
        console.log(`Removed sample company: ${company.name}`);
      }
    } else {
      console.log('No sample company found.');
    }

    // Remove sample job
    const jobs = await FirebaseService.query(collections.JOBS, 'title', '==', 'Junior Software Developer');
    if (jobs.length > 0) {
      for (const job of jobs) {
        await FirebaseService.delete(collections.JOBS, job.id);
        console.log(`Removed sample job: ${job.title}`);
      }
    } else {
      console.log('No sample job found.');
    }

    console.log('Sample data removal completed.');
  } catch (error) {
    console.error('Error removing sample data:', error);
  }
};

// Run the removal script
removeSampleData().then(() => {
  console.log('Script execution finished.');
  process.exit(0);
}).catch((error) => {
  console.error('Script execution failed:', error);
  process.exit(1);
});
