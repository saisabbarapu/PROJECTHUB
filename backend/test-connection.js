import mongoose from 'mongoose';

const mongoDB_url = 'mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority';

console.log('🔍 Testing MongoDB connection...');
console.log('Connection URL:', mongoDB_url.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

const testConnection = async () => {
  try {
    console.log('⏳ Attempting to connect...');
    
    await mongoose.connect(mongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log('✅ Connection successful!');
    console.log('Database name:', mongoose.connection.name);
    console.log('Connection state:', mongoose.connection.readyState);
    
    // Test a simple operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);
    
    if (error.code === 'ENOTFOUND') {
      console.log('\n💡 Solution: Check your internet connection');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solution: Check if MongoDB Atlas cluster is running');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n💡 Solution: Check your network connection or try again');
    } else if (error.message.includes('Authentication failed')) {
      console.log('\n💡 Solution: Check your MongoDB username and password');
    }
    
    process.exit(1);
  }
};

testConnection(); 