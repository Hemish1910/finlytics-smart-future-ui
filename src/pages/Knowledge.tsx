
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bookmark, BookOpen, Video, FileText, Play, Info, ArrowRight, Star, Clock } from "lucide-react";

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  
  const toggleBookmark = (id: string) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(item => item !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };
  
  // Sample content data
  const articles = [
    {
      id: "a1",
      title: "Understanding Market Indexes: Beyond the Numbers",
      description: "Learn how market indexes like the S&P 500 and Dow Jones are calculated and what they really tell us about the economy.",
      category: "Investing",
      readTime: "5 min read",
      image: "https://source.unsplash.com/random/300x200/?stock",
      featured: true,
    },
    {
      id: "a2",
      title: "Tax-Efficient Investing Strategies for Retirement",
      description: "Optimize your tax situation with these proven investment strategies designed for long-term retirement planning.",
      category: "Taxes",
      readTime: "8 min read",
      image: "https://source.unsplash.com/random/300x200/?retirement",
      featured: false,
    },
    {
      id: "a3",
      title: "Emergency Funds: How Much is Enough?",
      description: "Discover the right amount to save for emergencies based on your personal circumstances and financial goals.",
      category: "Savings",
      readTime: "4 min read",
      image: "https://source.unsplash.com/random/300x200/?savings",
      featured: false,
    },
    {
      id: "a4",
      title: "Investing in ESG Funds: Performance vs. Principles",
      description: "Analyze how environmental, social, and governance funds perform compared to traditional investment vehicles.",
      category: "Investing",
      readTime: "7 min read",
      image: "https://source.unsplash.com/random/300x200/?environment",
      featured: false,
    },
  ];
  
  const videos = [
    {
      id: "v1",
      title: "Decoding Financial Statements: A Beginner's Guide",
      description: "Learn how to read and understand the key components of corporate financial statements.",
      category: "Investing",
      duration: "12 min",
      thumbnail: "https://source.unsplash.com/random/300x200/?finance",
      featured: false,
    },
    {
      id: "v2",
      title: "Retirement Planning in Your 30s, 40s, and 50s",
      description: "Age-specific strategies for building a robust retirement portfolio at different life stages.",
      category: "Retirement",
      duration: "18 min",
      thumbnail: "https://source.unsplash.com/random/300x200/?aging",
      featured: true,
    },
    {
      id: "v3",
      title: "The Psychology of Spending: Breaking Bad Money Habits",
      description: "Understand the psychological factors that influence spending decisions and how to develop healthier financial habits.",
      category: "Personal Finance",
      duration: "15 min",
      thumbnail: "https://source.unsplash.com/random/300x200/?psychology",
      featured: false,
    },
  ];
  
  const guides = [
    {
      id: "g1",
      title: "Complete Guide to First-Time Home Buying",
      description: "Everything you need to know about purchasing your first home, from mortgage pre-approval to closing.",
      category: "Real Estate",
      readTime: "15 min read",
      chapters: 8,
      image: "https://source.unsplash.com/random/300x200/?house",
      featured: true,
    },
    {
      id: "g2",
      title: "Debt Elimination Playbook",
      description: "Step-by-step strategies for tackling different types of debt while building financial security.",
      category: "Debt Management",
      readTime: "12 min read",
      chapters: 6,
      image: "https://source.unsplash.com/random/300x200/?debt",
      featured: false,
    },
  ];
  
  // Combine all content
  const allContent = [
    ...articles.map(item => ({ ...item, type: "article" })),
    ...videos.map(item => ({ ...item, type: "video" })),
    ...guides.map(item => ({ ...item, type: "guide" })),
  ];
  
  // Filter content based on active tab and search
  const getFilteredContent = () => {
    let filtered = allContent;
    
    if (activeTab !== "all") {
      filtered = filtered.filter(item => item.type === activeTab);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  // Get featured content
  const featuredContent = allContent.filter(item => item.featured);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Knowledge Center</h1>
        <p className="text-gray-600 dark:text-gray-400">Expand your financial literacy with our curated resources and guides.</p>
      </div>
      
      {/* Featured Content */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Tip of the Day</h2>
        <Card className="glass-card border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-accent-600 dark:text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">The Power of Compound Interest</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Albert Einstein reportedly called compound interest the "eighth wonder of the world." If you invest $5,000 today with an 8% annual return and contribute just $200 monthly, in 30 years you'll have over $350,000 — even though you only put in $77,000!
                </p>
                <Button variant="outline" className="gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Featured Content Cards */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContent.map((item: any) => (
            <Card key={item.id} className="glass-card overflow-hidden hover-scale">
              <div className="h-40 bg-gray-100 dark:bg-gray-800 relative">
                <img 
                  src={item.image || item.thumbnail} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary fill-primary" />
                    </div>
                  </div>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className={
                    item.category === "Investing" ? "bg-primary/10 text-primary border-primary/20" :
                    item.category === "Taxes" ? "bg-accent/10 text-accent-600 dark:text-accent border-accent/20" :
                    "bg-secondary/10 text-secondary border-secondary/20"
                  }>
                    {item.category}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 -mt-1 -mr-2" 
                    onClick={() => toggleBookmark(item.id)}
                    aria-label={bookmarked.includes(item.id) ? "Remove bookmark" : "Add bookmark"}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarked.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                  </Button>
                </div>
                <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.type === "article" && <FileText className="h-3.5 w-3.5" />}
                  {item.type === "video" && <Video className="h-3.5 w-3.5" />}
                  {item.type === "guide" && <BookOpen className="h-3.5 w-3.5" />}
                  <span>{item.readTime || item.duration || `${item.chapters} chapters`}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-2 hover:text-primary">
                  {item.type === "video" ? "Watch Now" : "Read Now"} <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Search and Content Library */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Library</h2>
            <p className="text-gray-600 dark:text-gray-400">Browse our collection of financial resources</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              className="pl-9" 
              placeholder="Search resources..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="guide">Guides</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {getFilteredContent().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredContent().map((item: any) => (
                  <Card key={item.id} className="glass-card hover-scale">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className={
                          item.category === "Investing" ? "bg-primary/10 text-primary border-primary/20" :
                          item.category === "Taxes" ? "bg-accent/10 text-accent-600 dark:text-accent border-accent/20" :
                          "bg-secondary/10 text-secondary border-secondary/20"
                        }>
                          {item.category}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 -mt-1 -mr-2" 
                          onClick={() => toggleBookmark(item.id)}
                          aria-label={bookmarked.includes(item.id) ? "Remove bookmark" : "Add bookmark"}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                        </Button>
                      </div>
                      <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.type === "article" && <FileText className="h-3.5 w-3.5" />}
                        {item.type === "video" && <Video className="h-3.5 w-3.5" />}
                        {item.type === "guide" && <BookOpen className="h-3.5 w-3.5" />}
                        <span>{item.readTime || item.duration || `${item.chapters} chapters`}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="gap-2 hover:text-primary">
                        {item.type === "video" ? "Watch Now" : "Read Now"} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="article" className="space-y-6">
            {getFilteredContent().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredContent().map((item: any) => (
                  <Card key={item.id} className="glass-card hover-scale">
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {item.category}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 -mt-1 -mr-2" 
                          onClick={() => toggleBookmark(item.id)}
                          aria-label={bookmarked.includes(item.id) ? "Remove bookmark" : "Add bookmark"}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">{item.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{item.readTime}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="gap-2 hover:text-primary">
                        Read Article <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="video" className="space-y-6">
            {getFilteredContent().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredContent().map((item: any) => (
                  <Card key={item.id} className="glass-card overflow-hidden hover-scale">
                    <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="h-8 w-8 text-primary fill-primary" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        {item.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                          {item.category}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 -mt-1 -mr-2" 
                          onClick={() => toggleBookmark(item.id)}
                          aria-label={bookmarked.includes(item.id) ? "Remove bookmark" : "Add bookmark"}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="gap-2 hover:text-primary">
                        Watch Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No videos found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="guide" className="space-y-6">
            {getFilteredContent().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredContent().map((item: any) => (
                  <Card key={item.id} className="glass-card overflow-hidden hover-scale">
                    <div className="h-40 bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="bg-accent/10 text-accent-600 dark:text-accent border-accent/20">
                          {item.category}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 -mt-1 -mr-2" 
                          onClick={() => toggleBookmark(item.id)}
                          aria-label={bookmarked.includes(item.id) ? "Remove bookmark" : "Add bookmark"}
                        >
                          <Bookmark className={`h-4 w-4 ${bookmarked.includes(item.id) ? "fill-primary text-primary" : ""}`} />
                        </Button>
                      </div>
                      <CardTitle className="mt-2">{item.title}</CardTitle>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>{item.chapters} chapters</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < 4 ? "fill-accent text-accent" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="gap-2 hover:text-primary">
                        Start Learning <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No guides found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search to find what you're looking for.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Knowledge;
